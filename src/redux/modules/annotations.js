const LOAD = 'annotations/LOAD';
const LOAD_SUCCESS = 'annotations/LOAD_SUCCESS';
const LOAD_FAIL = 'annotations/LOAD_FAIL';
const UPDATE = 'annotations/UPDATE';
const UPDATE_SUCCESS = 'annotations/UPDATE_SUCCESS';
const UPDATE_FAIL = 'annotations/UPDATE_FAIL';

const initialState = {
};

function detangleGraph(results) {
  const aggregations = [];
  const annos = [];

  // distinguish between aggregations and annotations
  results['@graph'].forEach(result => {
    switch (result['@type']) {
      case 'ore:Aggregation': {
        aggregations.push(result);
        break;
      }
      case 'oa:Annotation': {
        annos.push(result);
        break;
      }
      default: {
        break;
      }
    }
  });

  return {'aggregations': aggregations, 'annotations': annos};
}

function relateAnnotationsToObjects(aggregations, annos) {
  // relate annotations to objects
  annos.forEach(annotation => {
    aggregations.some(aggregation => {
      // match annotation target with object
      if (aggregation['edm:aggregatedCHO']['@id'] === annotation['oa:hasTarget']) {
        // add annotation to object
        if (aggregation['edm:aggregatedCHO'].annotations) {
          aggregation['edm:aggregatedCHO'].annotations.push(annotation);
        } else {
          aggregation['edm:aggregatedCHO'].annotations = [annotation];
        }
        return true; // stop the looping madness
      }
    });
  });

  return aggregations;
}

function filterNotAnnotatedObjects(aggregations) {
  // fitler objects without annotations
  return aggregations.filter(aggregation => {
    return aggregation['edm:aggregatedCHO'].annotations ? true : false;
  });
}

function sortAnnotations(aggregations) {
  // sort annotation lists
  aggregations.forEach(aggregation => {
    if (aggregation['edm:aggregatedCHO'].annotations) {
      aggregation['edm:aggregatedCHO'].annotations.sort((one, two) => {
        if (one['oa:annotatedAt'] > two['oa:annotatedAt']) return 1;
        if (one['oa:annotatedAt'] < two['oa:annotatedAt']) return -1;
        return 0; // one must be equal to two
      });
    }
  });
  return aggregations;
}

function sortAggregations(aggregations) {
  // sort objects based on first entry annotation list
  return aggregations.sort((one, two) => {
    const dateOne = one['edm:aggregatedCHO'].annotations[0]['oa:annotatedAt'];
    const dateTwo = two['edm:aggregatedCHO'].annotations[0]['oa:annotatedAt'];

    if (dateOne > dateTwo) return 1;
    if (dateOne < dateTwo) return -1;
    return 0; // dateOne must be equal to dateTwo
  });
}

function processResults(graph) {
  const results = detangleGraph(graph);
  const aggregations = relateAnnotationsToObjects(results.aggregations, results.annotations);
  const filteredAggregations = filterNotAnnotatedObjects(aggregations);
  const aggregationsSortedAnnotations = sortAnnotations(filteredAggregations);
  return sortAggregations(aggregationsSortedAnnotations);
}

function filterAdditions(results, oldResults) {
  // filter objects that are not present
  return results.filter(result => {
    const id = result['edm:aggregatedCHO']['@id'];

    oldResults.forEach(old => {
      const oldId = old['edm:aggregatedCHO']['@id'];

      if (oldId === id) {
        console.log('matched ', oldId, ' with ', id);
        return false;
      }
    });
    return true;
  });
}

function processUpdate(results, oldResults) {
  // console.log('processing update ', results, ' old results ', oldResults);
  let additions;

  // merge in new results if there are already old ones
  if (oldResults) {
    // filter objects in results, extracting the new additions
    additions = filterAdditions(results, oldResults);
    console.log(additions);
    // add annotations to new additions

    // sort new additions

    // add annotations to old ones

    // concatenate the new additions to the old ones
  }
  return processResults(results);
}

export default function annotations(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        [action.platform]: {
          loading: true,
          loadingAt: action.date
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        [action.platform]: {
          ...state[action.platform],
          loading: false,
          loaded: true,
          results: processResults(action.result)
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        [action.platform]: {
          loading: false,
          loaded: false,
          error: action.error
        }
      };
    case UPDATE:
      return {
        ...state,
        [action.platform]: {
          ...state[action.platform],
          loading: true,
          loadingAt: action.date
        }
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        [action.platform]: {
          ...state[action.platform],
          loading: false,
          loaded: true,
          results: processUpdate(action.result['@graph'], state[action.platform].results)
        }
      };
    case UPDATE_FAIL:
      return {
        ...state,
        [action.platform]: {
          loading: false,
          loaded: false,
          error: action.error,
        }
      };
    default:
      return state;
  }
}

export function loadAnnotations(platform) {
  const url = `/api/annotations?platform=${platform}`;
  const date = new Date(Date.now()).toISOString();

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    platform: platform,
    date: date,
    promise: (client) => client.get(url)
  };
}

export function updateAnnotations(platform, date) {
  const url = `/api/annotations?platform=${platform}&since=${date}`;

  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    platform: platform,
    date: date,
    promise: (client) => client.get(url)
  };
}

'use strict';

var statistics = [
    {platform: "Accurator", users: 10},
    {platform: "Waisda?", users: 15},
    {platform: "Xeno-canto", users: 215}
];

var StatisticsContainer = React.createClass({
    // getInitialState: function() {
    //     return {data: []};
    // },
    render: function() {
        return (
            <div className="row">
                <PlatformStatisticsBox data={this.props.data[0]} />
                <PlatformStatisticsBox data={this.props.data[1]} />
                <PlatformStatisticsBox data={this.props.data[2]} />
            </div>
        );
    }
});

var PlatformStatisticsBox = React.createClass({
    // getInitialState: function() {
    //     return {data: []};
    // },
    render: function() {
        return (
            <div className="platformStatisticsBox col-sm-6 col-md-4">
                <h2>Statistics {this.props.data.platform}</h2>
            </div>
        );
    }
});

// var CommentBox = React.createClass({
//     getInitialState: function() {
//         return {data: []};
//     },
//     loadCommentsFromServer: function() {
//         $.ajax({
//             url: this.props.url,
//             dataType: 'json',
//             cache: false,
//             success: function(data) {
//                 this.setState({data: data});
//             }.bind(this),
//             error: function(xhr, status, err) {
//                 console.error(this.props.url, status, err.toString());
//             }.bind(this)
//         });
//     },
//     handleCommentSubmit: function(comment) {
//         var comments = this.state.data;
//         // Optimistically set an id on the new comment. It will be replaced by an
//         // id generated by the server. In a production application you would likely
//         // not use Date.now() for this and would have a more robust system in place.
//         comment.id = Date.now();
//         var newComments = comments.concat([comment]);
//         this.setState({data: newComments});
//         $.ajax({
//             url: this.props.url,
//             dataType: 'json',
//             type: 'POST',
//             data: comment,
//             success: function(data) {
//                 this.setState({data: data});
//             }.bind(this),
//             error: function(xhr, status, err) {
//                 this.setState({data: comments});
//                 console.error(this.props.url, status, err.toString());
//             }.bind(this)
//         });
//     },
//     componentDidMount: function() {
//         this.loadCommentsFromServer();
//         setInterval(this.loadCommentsFromServer, this.props.pollInterval);
//     },
//     render: function() {
//         return (
//             <div className="commentBox">
//                 <h1>Comments</h1>
//                 <CommentList data={this.state.data} />
//                 <CommentForm onCommentSubmit={this.handleCommentSubmit} />
//             </div>
//         );
//     }
// });
//
// var CommentList = React.createClass({
//     render: function() {
//         var commentNodes = this.props.data.map(function(comment) {
//             return (
//                 <Comment author={comment.author} key={comment.id}>
//                     {comment.text}
//                 </Comment>
//             );
//         });
//         return (
//             <div className="commentList">
//                 {commentNodes}
//             </div>
//         );
//     }
// });
//
// var CommentForm = React.createClass({
//     getInitialState: function() {
//         return {author: '', text: ''};
//     },
//     handleAuthorChange: function(e) {
//         this.setState({author: e.target.value});
//     },
//     handleTextChange: function(e) {
//         this.setState({text: e.target.value});
//     },
//     handleSubmit: function(e) {
//         e.preventDefault();
//         var author = this.state.author.trim();
//         var text = this.state.text.trim();
//         if (!text || !author) {
//             return;
//         }
//         this.props.onCommentSubmit({author: author, text: text});
//         this.setState({author: '', text: ''});
//     },
//     render: function() {
//         return (
//             <form className="commentForm" onSubmit={this.handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Your name"
//                 value={this.state.author}
//                 onChange={this.handleAuthorChange}
//             />
//             <input
//                 type="text"
//                 placeholder="Say something..."
//                 value={this.state.text}
//                 onChange={this.handleTextChange}
//             />
//                 <input type="submit" value="Post" />
//             </form>
//         );
//     }
// });
//
// var Comment = React.createClass({
//     rawMarkup: function() {
//         var md = new Remarkable();
//         var rawMarkup = md.render(this.props.children.toString());
//         return { __html: rawMarkup };
//     },
//     render: function() {
//         var md = new Remarkable();
//
//         return (
//             <div className="comment">
//                 <h2 className="commentAuthor">
//                     {this.props.author}
//                 </h2>
//                 <span dangerouslySetInnerHTML={this.rawMarkup()} />
//             </div>
//         );
//     }
// });


// instanciate root React component and add components in statistics div
ReactDOM.render(
    // send data from json object (for now, should be obtained from other places)
    <StatisticsContainer data={statistics} />,
    document.getElementById('statistics')
);

const React = require("react");
const { format_date, format_plural } = require("../../utils/helpers");

function PostItem(props) {
  const post = props.post;
  console.log(post);
  return (
        <a href={`/post/${post.id}`}>
            <article class="box">
                <div class="box-header highlight post-info-wrapper">
                    <span class="box-title">{post.post_title}</span>
                    <span class="author-date">
                    Posted by {post.user.username} on {format_date(post.created_at)}
                    </span>
                </div>
                <div class="post-body">
                    <p>{post.post_body}</p>
                </div>
                <div class="post-footer highlight">
                    <span>
                    {post.comment_count} {format_plural("comment", post.comment_count)}
                    </span>
                </div>
            </article>
        </a>
  );
}
module.exports = PostItem;

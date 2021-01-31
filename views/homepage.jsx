const React = require('react');
const DefaultLayout = require('./layouts/main');
const PostItem = require('./partials/post-info.jsx')

function homepageDisplay(props) {
    
    const posts = props.posts
    // console.log(posts);
    if (posts) {
        // console.log(posts);
        return (
            <DefaultLayout> 
                             
                <ul>
                {posts.map((post) => 
                    <li>
                    { <PostItem post={post} />}
                    </li>
                )}
                </ul> 
                              
            </DefaultLayout>

        );
    }
        
    else {
        return (
            <DefaultLayout>
            <p class="display-message">No posts yet. Sign up and make the first post on The Tech Blog!</p>
            </DefaultLayout>
        );
    }
}

module.exports = homepageDisplay;
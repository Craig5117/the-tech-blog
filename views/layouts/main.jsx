var React = require('react');

function DefaultLayout(props) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The Tech Blog</title>
        <link rel="stylesheet" href="/stylesheets/style.css" />
      </head>

      <body>
        <div class="wrapper">
          <header>
            <nav>
              <a href="/">Home</a>
              <a href="/dashboard">Dashboard</a>
              {props.loggedIn ? (
                <a href="" id="logout">
                  Logout
                </a>
              ) : (
                <a href="/login">Login</a>
              )}
            </nav>
            <h1>
              <a href="/">The Tech Blog</a>
            </h1>
          </header>

          <main>{props.children}</main>
        </div>
        {props.loggedIn ? (
          <script src="/javascript/logout.js"></script>
        ) : (
          <script src="/javascript/main.js"></script>
        )}
      </body>
    </html>
  );
}

module.exports = DefaultLayout;

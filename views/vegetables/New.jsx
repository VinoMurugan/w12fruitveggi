const React = require('react');

class New extends React.Component {
  render() {
    return (
        <div>
            <h1>New veggie page</h1>
            {/* NOTE: action will be the route, method will be the HTTP verb */}
            <form action="/vegetables" method="POST">
              Name: <input type="text" name="name" /><br/>
              Color: <input type="text" name="color" /><br/>
              Is Ready To Eat: <input type="checkbox" name="readyToEat" /><br/>
              <input type="submit" name="" value="Create veggie"/>
            </form>
        </div>);
    }
  }

module.exports = New;
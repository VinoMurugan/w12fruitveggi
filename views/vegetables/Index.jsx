const React = require('react');

class Index extends React.Component {
  render() {
      const { vegetables} = this.props;
      return (
              <div>
                  <h1>vegetables Index Page</h1>
                  <ul>
                      {vegetables.map((vegetable, i) => {
                          return (
                              <li>
                                  The{' '}
                                  <a href={`/vegetables/${i}`}>
                                      {vegetable.name}
                                  </a>{' '}
                                  is {vegetable.color} <br></br>
                                  {vegetable.readyToEat
                                      ? `It is ready to eat`
                                      : `It is not ready to eat`}
                                  <br />
                              </li>
                          );
                      })}
                  </ul>
                  <nav>
                  <a href="/fruits/new">Create a New Fruit</a>
                  </nav>
              </div>
      );
  }
}
module.exports = Index;
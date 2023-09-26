const React = require('react');
// As you can see we are using the app layout
const DefaultLayout = require('../layout/Default.jsx')

class Edit extends React.Component{
  render() {
    return (
      <DefaultLayout title="Fruits Edit Page">      
     {/* See the Layout takes in a prop called Title and we pass Edit Page to it  note: comments can't go first or last in  jsx return*/}
          {/* form is not complete we will do that below*/}
      <form action={`/fruits/${this.props.fruit._id}?_method=PUT`} method="POST">
          Name: <input type="text" name="name" defaultValue={this.props.fruit.name}/><br/>
          Color: <input type="text" name="color"  defaultValue={this.props.fruit.color}/><br/>
          Is Ready To Eat:
              { this.props.fruit.readyToEat? <input type="checkbox" name="readyToEat" defaultChecked />: <input type="checkbox" name="readyToEat"/> }
          <br/>
          <input type="submit" value="Submit Changes"/>
      </form>
      </DefaultLayout>
    )
  }
}
module.exports= Edit
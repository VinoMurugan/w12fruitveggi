const React = require('react')
const DefaultLayout = require('../layout/Default');
    class Show extends React.Component {
       render () {
        const vegetable = this.props.vegetable
        console.log(vegetable)
        return (
          <DefaultLayout title={"Vegetables Show Page"}>
          The {vegetable.name} is {vegetable.color}.
          {vegetable.readyToEat? 'Its is ready to eat' :'It is not ready to eat' }
          <br/>
      <a href='/vegetables'>Home</a>
      </DefaultLayout>
         );
        }
     }
     module.exports  = Show;
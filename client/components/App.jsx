import * as _       from 'lodash'
import React        from 'react'
import {observer}   from 'mobx-react'
import {observable, reaction, computed} from 'mobx'

import {Button, Header, Icon, Dimmer, List, Image, Step, Segment, Statistic, Card, Form, Container, Divider, Dropdown} from 'semantic-ui-react'

import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom'

var NumberFormat = require('react-number-format');

import FlipMove from 'react-flip-move';

import moment from 'moment';


const getJSON = (url) => {
  return fetch(url, {
    method: 'get',
    headers: new Headers({ 'Content-Type': 'application/json' })
  }).then((response) => { return response.json() })
}




class ProfileStore {
  @observable profile = {}
  @observable loading = false

  loadFromServer() {
    const store = this
    store.loading = true
    return getJSON('https://one-money2020.herokuapp.com/api/one/rewards?user=nick').then((data) => {
      const balance   = data.rewardsBalance
      const firstName = data.primaryAccountHolder.firstName
      const lastName  = data.primaryAccountHolder.lastName
      const cardName  = data.accountDisplayName
      store.profile = new ProfileModel(store, balance, firstName, lastName, cardName)
      store.loading = false
    })
  }
}




// class OfferModel {
//   store;
//   id;
//   @observable icon     = null;
//   @observable title    = "title";
//   @observable text     = "text";
//   @observable color    = "red";
//   @observable selected = false;
//   @observable expiry   = ""
//   @observable redeemed = false

//   constructor(store, id, color, icon, title, text, expiry) {
//     this.store    = store
//     this.id       = id
//     this.color    = color
//     this.icon     = icon
//     this.title    = title
//     this.text     = text
//     this.selected = false
//     this.expiry   = expiry
//   }

//   select() {
//     console.log("Selecting offer:", this)
//     this.selected = true
//   }

//   redeem() {
//     console.log("REEDEEMEENG:", this)
//     this.redeemed = true
//     this.color = {r:'154', g:'205', b:'50'}
//     this.icon  = "&#xf00c;"
//   }

//   static fromJSON(store, json) {
//     return new OfferModel(store, json.id, json.color, json.icon, json.title, json.text, json.expiry)
//   }
// }



// class OfferStore {
//   @observable offers  = []
//   @observable loading = false

//   @observable sortField = "id"

//   constructor() {
//     setInterval(() => {
//       console.log('LOADING!')
//       if (this.loading) return
//       if (this.hasSelected()) return
//       this.loadFromServer()
//     }, 1000)
//   }

//   hasSelected() {
//     let result = false
//     this.offers.forEach((x) => { result = result || x.selected })
//     return result
//   }

//   removeSelection() {
//     this.offers.forEach((x) => { x.selected = false })
//     // this.offers = this.sort(this.offers)
//   }

//   sort(offers) {
//     let sort = (offers) => {
//       let sortFn = (offer) => {
//         if (this.sortField == "id" || this.sortField == "redeemed") {
//           return offer.id * -1;
//         }
//         if (this.sortField == "expiry") {
//           let date = moment(offer.expiry, 'MM/DD/YYYY')
//           if (!date.isValid()) { return Infinity }
//           return date.unix()
//         }
//       }
//       return _.sortBy(offers, sortFn)
//     }
//     let offersRedeemed  = sort(offers.filter(x =>  x.redeemed))
//     let offersAvailable = sort(offers.filter(x => !x.redeemed))
//     console.log("Redeemed:", offersRedeemed.length)
//     console.log("Available:", offersAvailable.length)
//     if (this.sortField == "redeemed") {
//       return offersRedeemed
//     } else {
//       return offersAvailable.concat(offersRedeemed)
//     }
//   }

//   setSortField(field) {
//     console.log("Setting sort field:", this.sortField, "->", field)
//     this.sortField = field
//     this.offers = this.sort(this.offers)
//   }

//   @computed get selected() {
//     let result = null
//     this.offers.forEach((x) => {
//       if (x.selected) result = x
//     })
//     return result
//   }

//   loadFromServer() {
//     const store = this
//     this.loading = true
//     getJSON('https://one-money2020.herokuapp.com/api/one/offers').then((data) => {
//       console.log("JSON data:", data)
//       if (this.hasSelected()) {
//         this.loading = false
//         return
//       }
//       let offers = data.map((row) => {
//         const title  = row.title
//         const text   = row.text
//         const id     = row.id
//         const icon   = row.icon
//         const color  = row.color
//         const expiry = row.expiration
//         const data   = {id, color, icon, title, text, expiry}
//         return OfferModel.fromJSON(store, data);
//       });
//       const redeemed = _.filter(this.offers, x => x.redeemed).map(x => x.id)
//       offers.forEach(x => {
//         redeemed.forEach(id => { if (x.id == id) x.redeem() })
//       })
//       store.offers = this.sort(offers)
//       store.loading = false
//     }).catch((error) => {
//       store.loading = false
//       console.error(error)
//     });
//   }

// }


// const PointHeader = observer(({profileStore}) => {
//   const profile = profileStore.profile
//   const style = {
//     background: "rgba(255,255,255,0.1)"
//   , color:      "white"
//   , padding:    "1em 1.3em"
//   }
//   return (
//     <div style={style}>
//       <Header as='h2' textAlign='right' dividing size='large' >
//         <Icon name='mastercard' />
//         <Header.Content inverted>
//           <Header.Subheader>{profile.cardName}</Header.Subheader>
//           <NumberFormat value={profile.balance} displayType={'text'} thousandSeparator={true} />&nbsp;points available!
//         </Header.Content>
//       </Header>
//     </div>
//   )
// })


// @observer
// class OfferDetails extends React.Component {

//   render() {
//     const {offerStore} = this.props
//     let offer = offerStore.selected
//     const style = {
//       position: 'absolute'
//     , top: 0, left: 0, bottom: 0, right: 0
//     , zIndex: 90
//     , opacity: offer? 1: 0
//     , transition: (offer? 'opacity 1s':'opacity 0.4s')
//     , pointerEvents: (offer? 'inherit':'none')
//     }
//     this.html = (x) => { return {__html:x} }
//     offer = offer? offer : {}
//     const inlineStyle = `
//     .category-icon {
//       margin: auto;
//       width: 60vw;
//       height: 60vw;
//       margin-top: 10vh;
//       border-radius: 50%;
//       background: rgba(0,0,0,0.1);
//       font-family: FontAwesome;
//       font-size: 6.5em;
//       text-align: center;
//       line-height: 60vw;
//       color: rgba(0,0,0,0.8);
//       box-shadow: inset 0px 0px 0px 20px rgba(0,0,0,0.1);
//     }
//     .offer-title, .offer-text {
//       text-align: center;
//       padding: 0.3em;
//     }
//     .redeem-button {
//       text-align: center;
//     }
//     .button-container {
//       text-align: center;
//       position: absolute;
//       bottom: 20vw;
//       left: 0; right: 0;
//     }
//     `
//     const onClick = () => {
//       offerStore.removeSelection()
//     }
//     const onRedeem = () => {
//       offer.redeem()
//     }
//     return (
//       <div style={style}>
//         <style>{inlineStyle}</style>
//         <div className="category-icon" onClick={onClick} dangerouslySetInnerHTML={this.html(offer.icon)}></div>
//         <h1 className="offer-title"dangerouslySetInnerHTML={this.html(offer.title)}></h1>
//         <h2 className="offer-text"dangerouslySetInnerHTML={this.html(offer.text)}></h2>
//         <div className="button-container"><Button className='redeem-button' size='massive' onClick={onRedeem}>Redeem!</Button></div>
//       </div>
//     )
//   }
// }


// const ToggleButton = observer(
//   ({offerStore, label, curr, sortField}) => {
//     const onClick = () => {
//       offerStore.setSortField(sortField)
//     }
//     console.log("Toggle:", label, offerStore.sortField, sortField)
//     if (offerStore.sortField == sortField) {
//       return (<Button primary>{label}</Button>)
//     } else {
//       return (<Button onClick={onClick}>{label}</Button>)
//     }
// })


// const GoalSelectStep = (model) => {
//   return {
//     header: () => {
//       const attributes = {}
//       if (model.completed) { attributes.completed = 'completed' }
//       return (
//         <Step>
//           <Icon name='truck' />
//           <Step.Content {...attributes}>
//             <Step.Title>Campaign Goal</Step.Title>
//             <Step.Description>Who would you like to target?</Step.Description>
//           </Step.Content>
//         </Step>
//       )
//     }
//   , body: () => {
//       return (
//         <h1>YO!</h1>
//       )
//     }
//   }
// }


const StepModelHeaderView = (model, index) => {
    const attributes = {}
    if (model.completed) {
      attributes.completed = true
    } else if (model.isActive) {
      attributes.active = true
    } else {
      attributes.disabled = true
    }
    return (
      <Step key={index} {...attributes}>
        <Icon name={model.icon} />
        <Step.Content>
          <Step.Title>{model.title}</Step.Title>
          <Step.Description>{model.description}</Step.Description>
        </Step.Content>
      </Step>
    )
}


const StepModelBodyView = (model) => {
  return (
    <div>
    <h2>The calculated budget for this campaign is:</h2>
    <h1>$42,410</h1>
    <h4>Hit next to approve and start the campaign!</h4>
    </div>
  )
}


class StepModel {
  @observable completed = false
  title                 = ""
  description           = ""

  constructor(store, title, description, icon) {
    this.store       = store
    this.title       = title
    this.description = description
    this.completed   = false
    this.icon        = icon
  }

  @computed get isValid() {
    return true;
  }

  @computed get isActive() {
    return this.store.currentStep.title == this.title
  }

  next() {
    this.store.next()
  }

  serialize() {
    return {}
  }

  getHeaderView() {
    return StepModelHeaderView
  }

  getBodyView() {
    return StepModelBodyView
  }
}


class TargetStepModelOption {
  @observable selected = false
  id    = ""
  label = ""
  count = parseInt((10000 + (Math.random() * 100000)).toFixed(2))

  constructor(id, label) {
    this.id = id
    this.label = label
    this.selected = false
  }
}


// ICONS = {
//   'fa-birthay-cake': '&#xf1fd;',
//   'fa-camera':       '&#xf030;',
//   'fa-coffee':       '&#xf0f4;',
//   'fa-credit-card':  '&#xf09d;',
//   'fa-heart':        '&#xf004;',
//   'fa-hotel':        '&#xf236;',
//   'fa-tree':         '&#xf1bb;',
//   'fa-twitter':      '&#xf099;',
// }


class CopyStepFormCategoriesModel {
  @observable selected = null
  options = [
    {'category':'Bills', 'subcategory':'Utilities', icon:'&#xf09d;'}
  , {'category':'Bills', 'subcategory':'Services', icon:'&#xf09d;'}
  , {'category':'Food & Dining', 'subcategory':'Fast Food', icon:'&#xf1fd;'}
  , {'category':'Food & Dining', 'subcategory':'Coffee Shop', icon:'&#xf0f4;'}
  , {'category':'Food & Dining', 'subcategory':'Restaurant', icon:'&#xf1fd;'}
  , {'category':'Food & Dining', 'subcategory':'Grocery', icon:'&#xf099;'}
  , {'category':'Health & Fitness', 'subcategory':'Gym', icon:'&#xf004;'}
  , {'category':'Shopping', 'subcategory':'Apparel', icon:'&#xf030;'}
  , {'category':'Shopping', 'subcategory':'Gifts', icon:'&#xf030;'}
  , {'category':'Shopping', 'subcategory':'Electronics', icon:'&#xf030;'}
  , {'category':'Travel', 'subcategory':'Car', icon:'&#xf1b9;'}
  , {'category':'Travel', 'subcategory':'Hotel', icon:'&#xf236;'}
  , {'category':'Travel', 'subcategory':'Air', icon:'&#xf072;'}
  ]
  constructor(form) {
    this.form = form
    this.options.forEach((x) => x.id = JSON.stringify(x))
  }
}



@observer
class CopyStepFormCategoriesModelView extends React.Component {
  render() {
    const {categoriesModel} = this.props
    const text = categoriesModel.selected? `${categoriesModel.category} - ${categoriesModel.subcategory}` : 'Select a category...'
    const onClick = (option) => {
      console.log(option)
      console.log("OPTION:", option.form)
      categoriesModel.form.category    = option.category
      categoriesModel.form.subcategory = option.subcategory
      categoriesModel.form.icon        = option.icon
      console.log(categoriesModel)
    }
    this.html = (x) => { return {__html:x} }
    const options = categoriesModel.options.map((x) => {
      let itemText = `${x.category} - ${x.subcategory}`
      let buttonAttr = {}
      if (x.category == categoriesModel.form.category && x.subcategory == categoriesModel.form.subcategory && categoriesModel.form.icon == categoriesModel.form.icon) {
        buttonAttr.primary = true
      } else {
        buttonAttr.basic = true
      }
      return (
        <Button className='category-button' size='large' color='blue' key={itemText} {...buttonAttr} onClick={()=>{ onClick(x) }}>
        <span className='icon-sauce' dangerouslySetInnerHTML={this.html(x.icon)}></span>
        {itemText}
        </Button>
      )
    })
    return (
      <div>
      <h4>Category</h4>
      {options}
      </div>
    )
  }
}



class CopyStepFormModel {
  @observable title       = ""
  @observable text        = ""
  @observable expiration  = moment().add(4, 'weeks').format('MM/DD/YYYY')
  @observable category    = "Travel"
  @observable subcategory = "Hotels"
  @observable icon        = "&#xf236;"

  constructor() {
    this.categoriesModel = new CopyStepFormCategoriesModel(this)
  }

  serialize() {
    const  {title, text, expiration, category, subcategory, icon} = this
    return {title, text, expiration, category, subcategory, icon}
  }
}



class CopyStepModel extends StepModel {
  @observable form = new CopyStepFormModel()

  constructor(store) {
    super(store, "Write Copy", "What will your campaign look like?", "write")
  }

  getBodyView() {
    return CopyStepModelBodyView
  }

  serialize() {
    let copy = this.form.serialize()
    return {copy}
  }
}


const CopyStepModelBodyView = (model) => {
  // title:       <input type="text" name="title" value="" />
  // icon:        <input type="text" name="icon" value="" />
  // text:        <input type="text" name="text" value="" />
  // expiration:  <input type="text" name="expiration" value="" />
  // category:    <input type="text" name="category" value="" />
  // subcategory: <input type="text" name="subcategory" value="" />
  // target:      <input type="text" name="target" value="" />
  const handleChange = (e, x) => {
    model.form[x.name] = x.value
  }
  return (
    <Form>
      <Form.Input    width={8} size='huge' name='title' label='Title'       placeholder='A catchy name for your promo!'               onChange={handleChange} />
      <Form.TextArea width={8} size='huge' name='text'  label='Description' placeholder='A more detailed description of the promo...' onChange={handleChange} />
      <br /><br />
      <CopyStepFormCategoriesModelView categoriesModel={model.form.categoriesModel} />
    </Form>
  )
}



class TargetStepModelOptions {
  @observable options = []
  data = [
    {
    "id":    "new_customers"
    ,"label": "New Customers"
    },
    {
    "id":    "repeat_traffic"
    ,"label": "Drive Repeat Traffic"
    },{
    "id":    "recent_activity"
    ,"label": "Recent Activity"
    },{
    "id":    "weather"
    ,"label": "Weather"
    },{
    "id":    "location"
    ,"label": "Location"
    },{
    "id":    "like_for_like"
    ,"label": "Like For Like"
    },{
    "id":    "personal_preference"
    ,"label": "Personal Preference"
    },{
    "id":    "social_data"
    ,"label": "Social Data, Bring a Friend, Referals"
    }
  ]
  constructor() {
    this.options = this.data.map((x) => new TargetStepModelOption(x.id, x.label, x.count))
  }
  getSelected() {
    return this.options.filter((x) => x.selected);
  }
  getCount() {
    let selected = this.getSelected()
    return _.sum(selected.map((x) => { return x.count }))
  }
  serialize() {
    return this.getSelected().map((x) => x.id)
  }
}


const TargetStepModelOptionView = (option) => {
  const color = 'green'
  const buttonText = option.selected?  'Cancel Targetting' : "Enable Targetting"
  const buttonAttr = {}
  if (!option.selected) {
    buttonAttr.basic = true
  }
  const onClick = () => {
    option.selected = !option.selected
  }
  return (
    <Card key={option.id}>
      <Card.Content>
        <Card.Header>
          {option.label}
        </Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div className='ui buttons center'>
          <Button color={color} onClick={onClick} {...buttonAttr}>{buttonText}</Button>
        </div>
      </Card.Content>
      <Card.Content extra>
      <div>
        <Icon name='user' />
        <NumberFormat value={option.count} displayType={'text'} thousandSeparator={true} />
      </div>
      </Card.Content>
    </Card>
  )
}


class TargetStepModel extends StepModel {
  @observable optionModel = new TargetStepModelOptions()

  constructor(store) {
    super(store, "Target Cardholders", "Who are you targetting?", "bullseye")
  }

  getBodyView() {
    return (model) => {
      console.log(model)
      let options = model.optionModel.options.map((option) => TargetStepModelOptionView(option))
      return (
        <Card.Group>{options}</Card.Group>
      )
    }
  }

  @computed get isValid() {
    let target = this.optionModel.serialize()
    return target.length > 0
  }

  serialize() {
    let target = this.optionModel.serialize()
    return {target}
  }
}



class PortalModel {
  @observable targetStepModel = null

  constructor(targetStepModel) {
    this.targetStepModel = targetStepModel
  }

  @computed get count() {
    return this.targetStepModel.optionModel.getCount()
  }
}


const PostJSON = (url, data) => {
  console.log("POSTING DATA:", data)
  var formData = new FormData();
  formData.append("json", JSON.stringify(data) );
  return fetch(url, {method:"POST", body:formData})
  .then((res) => {
    console.log(res.status);
    return res.json();
  })
  .then((data) => {
    console.log("RESPONSE:", data)
  })
}


class StepStore {
  @observable steps = []
  @observable currentStepIndex = 0
  @observable submitted = false

  @computed get currentStep() {
    return this.steps[this.currentStepIndex] || null;
  }

  isLastStep() {
    return this.currentStepIndex >= (this.steps.length - 1);
  }

  next() {
    if (this.isLastStep()) {
      this.submit()
      return
    }
    let currentStep = this.steps[this.currentStepIndex]
    currentStep.completed = true
    console.log(currentStep.serialize())
    this.currentStepIndex = Math.min((this.currentStepIndex+1), this.steps.length-1)
    console.log("Next step:", this.currentStepIndex);
  }

  add(step) {
    this.steps.push(step)
  }

  submit() {
    let url = "https://one-money2020.herokuapp.com/api/one/offers/create"
    console.log("Submitting payload!")
    let payload = {}
    this.steps.forEach((step) => {
      let stepPayload = step.serialize()
      console.log(stepPayload)
      payload = _.extend(payload, stepPayload)
    })
    console.log("Submitting...", payload);
    return PostJSON(url, payload).then((x) => {
      console.log('success!')
    })
  }
}


@observer
class Steps extends React.Component {
  render() {
    const {stepStore} = this.props
    if (!stepStore) return null
    const {currentStep} = stepStore
    if (!currentStep) return null
    const onNext = () => {
      console.log("ON NEXT:")
      stepStore.next()
    }
    const onReset = () => {
      currentStep.reset()
    }
    const buttonAttr = {}
    if (!currentStep.isValid) {
      buttonAttr.disabled = true
    }
    return (
      <div>
        <Step.Group attached='top' fluid size='huge'>
          {stepStore.steps.map((step, i) => step.getHeaderView()(step, i))}
        </Step.Group>
        <Segment attached>
          {currentStep.getBodyView()(currentStep)}
          <br /><br /><br />
          <Divider />
          <Button primary size='huge' onClick={onNext} {...buttonAttr}>Next</Button>
        </Segment>
      </div>
    )
  }
}


@observer
class PortalHeader extends React.Component {
  render() {
    const {portalModel} = this.props
    const style = {
      visibility: (portalModel.count > 0)? 'visible' : 'hidden'
    }
    return (
      <Segment clearing>
        <Header as='h2' floated='left' inverted>
          <Icon name='settings' />
          <Header.Content>
            <div style={{color:'black'}}>POP - Merchant Portal</div>
            <Header.Subheader>
              <div style={{color:'black'}}>Accurate targetting for your promos!</div>
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Header as='h2' floated='right'>
          <Header.Content>
            <Statistic size='small' style={style}>
              <Statistic.Value>
                <NumberFormat value={portalModel.count} displayType={'text'} thousandSeparator={true} />
              </Statistic.Value>
              <Statistic.Label style={{fontSize:'0.8em'}}>Targeted Cardholders</Statistic.Label>
            </Statistic>
          </Header.Content>
        </Header>
      </Segment>
    )
  }
}


@observer
class Home extends React.Component {
  render() {
    const stepStore = new StepStore()
    const targetStepModel = new TargetStepModel(stepStore)
    const portalModel = new PortalModel(targetStepModel)
    stepStore.add(targetStepModel)
    stepStore.add(new CopyStepModel(stepStore))
    stepStore.add(new StepModel(stepStore, "Budget & Submit!",   "Spend money to make money",          "dollar"))
    console.log(stepStore.steps)
    return (
      <div>
        <PortalHeader portalModel={portalModel} />
        <Steps stepStore={stepStore} />
      </div>)
  }
}


const App = observer(() => {
  return (
    <div style={{height:"100%", width:"100%"}}>
      <Home />
    </div>
  )
})


export default () => {
  return (
    <App />
  )
}
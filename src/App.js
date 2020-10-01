
import React, { useState } from 'react';
import Form from './components/Form/Form';
import './App.scss';

const App = props => {

  const [_pending, _setPending]=useState()
  const onSubmit = values => {
    _setPending(true)
    setTimeout(()=>{
      _setPending(true);
      _setPending(false)
    }, 3000)
  }

  const formInputs = [
    {
      name: 'text',
      label: 'Text',
      validation: { required: 'Champs requis' }
    },
    {
      name: 'number',
      label: "Number",
      type: 'number',
      validation: { required: "Champs requis" },
      endAdornment: <span className='fs14 cgrey medium'>Unity</span>
    },
    {
      content : <div className='fs18 medium marb10'>Title or Content between inputs</div>
    },
    {
      name: 'select',
      label: "Select",
      type: 'select',
      validation: { required: "Champs requis" },
      options: (values) => [{value : 1, name : "Option 1"},{value : 2, name : "Option 2"},{value : 3, name : "Option 3"}]
    },
    
    {
      name: 'switch',
      label: 'Switch',
      type: 'switch'
    },
    {
      name: 'checkbox',
      label: 'Checkbox',
      type: 'check'
    },
  ]

  return (
    <div className='App relh100vh flex col aic jcc'>
      <div className='w350 flex row'>

        <Form className=''
          title={<div><span className='fs30'>Mon formulaire avec</span> <br/>@material-ui & react-hook-form</div>}
          inputs={formInputs}
          onSubmit={onSubmit}
          submitText='Enregistrer'
          pending={_pending}
        />
      </div>
    </div>
  )
}

export default App
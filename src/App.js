
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
    /*{
      content: <div className='mart10 marb20'>
        <div className='app-imgContainer  w150 h150'>
          <ImageUploader image={_image} updateImage={onUpdateImage}
            preview={(image) => <img className='relw100 relh100' src={image} alt='produit' />}
            pending={uploadPictureRequest.pending || setProductRequest.pending}
            retry={_retryUploadingPicture.retry}
            emptyPreview={() =>
              <div className='relw100 relh100 flex aic jcc cgrey'>
                <ImageIcon classes={{ root: 'app-imgIcon' }} />
              </div>}
            retryPreview={() =>
              <div className='relw100 relh100 flex aic jcc cgrey pointer' onClick={sendImage}>
                <ReplayIcon classes={{ root: 'app-replyIcon' }} />
              </div>
            }
            pendingPreview={() =>
              <div className='relh100 flex aife jcc'>
                <p className='cwhite fs10 marb10'>Enregistrement en cours de l'image...</p>
              </div>} />
        </div>
      </div>
    },*/
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
    /*{
      name: 'subCategory',
      label: "Sous-catégorie",
      type: 'select',
      defaultValue: defaultSubCategory || _.get(product, 'subCategory'),
      validation: { required: "Champs requis" },
      watch: 'category',
      options: (watchedValue) => {
        console.log(watchedValue)
        const category = watchedValue && categories.find(category => category.name === watchedValue)
        return _.get(category, 'subCategories') && category.subCategories.map(subCategory => ({ value: subCategory, name: subCategory }))
      }
    },*/
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
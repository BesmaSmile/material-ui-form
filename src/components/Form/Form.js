import React from 'react';
import { useForm, useWatch, Controller } from "react-hook-form";
import { Button, OutlinedInput, InputLabel, FormControl, FormControlLabel, Select, MenuItem, Switch, Checkbox } from '@material-ui/core';
import _ from 'lodash';
import './Form.scss';

const Form = (props) => {
  const { title, inputs, onSubmit, submitText, pending, disabled } = props
  const { handleSubmit, errors, getValues, control, setValue } = useForm();

  const defaultValues = {}
  inputs.forEach(input => {
    if (input.defaultValue) defaultValues[input.name] = input.defaultValue
  })

  const dependentSelection = useWatch({
    control,
    defaultValue: defaultValues
  })

  const resetWatchingInputs = (e) => {
    const { name } = e.target
    const watchingInputs = inputs.filter(input => input.watch === name)
    watchingInputs.forEach(watchingInput => {
      setValue(watchingInput.name)
    });
  }

  const cleanAndSubmit = (values) => {
    const toSend = _.omitBy(values, value => _.isNil(value) || value === '');
    onSubmit(toSend)
  }

  return (
    <form className='Form' onSubmit={handleSubmit(cleanAndSubmit)} >
      <div className='flex col'>
        <div className='txtac medium fs18 marb20'>{title}</div>
        {
          inputs.map(input => {
            if (input.content)
              return input.content
            else {
              const type = ['select', 'switch', 'check'].find(t => t === input.type) || 'default'
              const additionalValidation = input.combinedValdation ? { validate: value => input.combinedValdation(getValues()) } : {}
              const adornments = {
                endAdornment: input.endAdornment,
                startAdornment: input.startAdornment
              }

              return (
                <>
                  {(input.type !== 'select' || input.options(dependentSelection[input.watch]))
                    && (!input.hidden || !input.hidden(dependentSelection[input.watch])) &&
                    <div key={input.name}
                      witherror={errors[input.name] ? 'true' : 'false'}
                      className={`frm-inputField flex col ${type !== 'check' ? 'marv10' : ''}`}>
                      <FormControl variant="outlined" key={input.name}>
                        {type !== 'switch' && type !== 'check' && <InputLabel htmlFor="component-outlined">
                          <span>{input.label} </span>
                        </InputLabel>}
                        <Controller
                          control={control}
                          name={input.name}
                          defaultValue={input.defaultValue}
                          rules={{ ...input.validation, ...additionalValidation }}
                          render={({ onChange, onBlur, value, name }) => (
                            <>
                              {type === 'select' &&
                                <Select
                                  label={input.label}
                                  error={errors[input.name] ? true : false}
                                  onChange={(e) => { onChange(e); resetWatchingInputs(e); }}
                                  onBlur={onBlur}
                                  value={value}
                                  name={name}
                                  disabled={disabled || input.disabled}>
                                  {input.options(dependentSelection[input.watch]).map(option => (
                                    <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                                  ))
                                  }
                                </Select>
                              }
                              {type === 'switch' &&
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={value}
                                      onChange={e => onChange(e.target.checked)}
                                      name={name}
                                      disabled={disabled || input.disabled}
                                      inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />}
                                  label={input.label} />
                              }
                              {type === 'check' &&
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={value}
                                      onChange={e => onChange(e.target.checked)}
                                      name={name}
                                      disabled={disabled || input.disabled}
                                      inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />}
                                  label={input.label} />
                              }
                              {type === 'default' &&
                                <OutlinedInput
                                  label={input.label}
                                  onChange={onChange}
                                  onBlur={onBlur}
                                  value={value}
                                  name={name}
                                  disabled={disabled || input.disabled}
                                  error={errors[input.name] ? true : false}
                                  type={input.type || 'text'}
                                  {...adornments} />
                              }
                            </>

                          )} />

                      </FormControl>
                      <div className='frm-error fs12 marl3 mart5 cred light' >{errors[input.name] && errors[input.name].message}</div>
                    </div>
                  }
                </>
              )
            }

          })
        }
      </div>
      <div className='frm-largeButton relw100 mart20'>
        <Button variant="contained"
          classes={{
            root: 'frm-submitButton'
          }}
          type='submit'
          disabled={pending || disabled}>
          {!pending ? submitText : "En cours..."}
        </Button>
      </div>
    </form>
  )
}

export default Form;
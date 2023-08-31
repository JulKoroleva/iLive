import React from 'react';

function Form(props) {
  return (
    
      <form onSubmit={props.onSubmit} className="form" name={props.name} noValidate>
        <div className='form__container'>
          <h3 className="form__container_title">{props.title}</h3>
          {props.children}
        </div>
        <div className='form__button'>
          <button className="form__submit-button" type="submit">{props.submit}</button>
        </div>
      </form>
   
  );
}

export default Form;

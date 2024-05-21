import React from 'react';
import Form from 'react-bootstrap/Form';
import "./Foote.css";

const Footer = () => {
  return (
    <div style={{ margin: '1rem', marginBottom: "7rem"}}>
      <div className='heading'>FAQ</div>
      <div className='all-drop'>
        <Form.Select className="form-select my-3" aria-label="Default select example" >
          <option>Can education flashcards be used for all age groups?</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <Form.Select className="form-select my-3" aria-label="Default select example">
          <option>How do education flashcards work?</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <Form.Select className="form-select my-3" aria-label="Default select example">
          <option>Can education flashcards be used for test preparation?</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default Footer;
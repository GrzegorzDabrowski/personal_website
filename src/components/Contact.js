import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.scss';
import AdressImg from '../assets/icons/icons8-placeholder-50.png';
import PhoneImg from '../assets/icons/icons8-phone-50.png';
import EmailImg from '../assets/icons/email-icons8-mail-50.png';
import {validName, validEmail, validPhone} from '../validation/RegEx';

const Contact = () => {

    const form = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('')
    const textareaRef = useRef();
    // validation states
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const refInputName = useRef(null);
    const refInputEmail = useRef(null);
    const refInputPhone = useRef(null);
    const refButton = useRef(null);
    const initialErrors = {name: "", email: "", phonenumber: "", message: ""}
    const [formErrors, setFormErrors] = useState(initialErrors);
    // emailjs ref

    // INPUT STATES
    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const phoneChangeHandler = (event) => {
        setPhone(event.target.value);
    };

    const messageChangeHandler = (event) => {
        setMessage(event.target.value);
    }

    /* 
        Auto Resizing Textarea 
    */
    useEffect(() => {
        const textareaHeight = textareaRef.current;
    
        const adjustHeight = () => {
            /* reset the height to auto*/
            textareaHeight.style.height = 'auto'; 
            /* pass to height property value of scrollHeight with px format */
            textareaHeight.style.height = `${textareaHeight.scrollHeight}px`; 
        }
        // call function
        adjustHeight();

        // this listener is calling adjustHeight everytime its changin 
        textareaHeight.addEventListener('input', adjustHeight);

        // clearing eventlistner when componen is unmounted
        return () => {
            textareaHeight.removeEventListener('input', adjustHeight);
        };
    }, [])

    /*
    VALIDATION FUNCTIONS
    */

    useEffect(() => {
        const refNameStyle = refInputName.current.style;
        const refEmailStyle = refInputEmail.current.style;
        const refPhoneStyle = refInputPhone.current.style;
        const refButtonStyle = refButton.current.style;

        // button disability
        if(validName.test(name) && validEmail.test(email) && message.length > 0){
            setButtonDisabled(false)
            refButtonStyle.borderColor =  '#F88017';
            refButtonStyle.cursor = 'pointer'
        } else {
            setButtonDisabled(true)
            refButtonStyle.borderColor = '#f5f3f3';
            refButtonStyle.cursor = 'crosshair'
        }

        // input validations

        // NAME
        if(validName.test(name)){
            setFormErrors(prevFormErrors => ({...prevFormErrors, name: ""}))
            refNameStyle.borderBottom = '2px solid #42ac79'
        } else if (!validName.test(name) && name !== "") {
            setFormErrors(prevFormErrors => ({...prevFormErrors, name: "Min. 3, and only letters."}))
            refNameStyle.borderBottom = '2px solid red'
        } else if (name.length === 0) {
            setFormErrors(prevFormErrors => ({...prevFormErrors, name: ""}))
            refNameStyle.borderBottom = '2px solid #3b313181'
        }

        // EMAIL
        if(validEmail.test(email)) {
            setFormErrors(prevFormErrors => ({...prevFormErrors, email: ""}))
            refEmailStyle.borderBottom = '2px solid #42ac79'
        } else if (!validEmail.test(email) && email !== "") {
            setFormErrors(prevFormErrors => ({...prevFormErrors, email: "Please, write valid email adress."}))
            refEmailStyle.borderBottom = '2px solid red'
        } else if (email.length === 0) {
            setFormErrors(prevFormErrors => ({...prevFormErrors, email: ""}))
            refEmailStyle.borderBottom = '2px solid #3b313181'
        }

        // PHONE NUMBER
        if(validPhone.test(phone)){
            setFormErrors(prevFormErrors => ({...prevFormErrors, phonenumber: ""}))
            refPhoneStyle.borderBottom = '2px solid #42ac79'
        } else if (!validPhone.test(phone) && phone !== "") {
            setFormErrors(prevFormErrors => ({...prevFormErrors, phonenumber: "Please, write valid phone number, eg. 000-000-000."}))
            refPhoneStyle.borderBottom = '2px solid red'
        } else if (phone.length === 0) {
            setFormErrors(prevFormErrors => ({...prevFormErrors, phonenumber: ""}))
            refPhoneStyle.borderBottom = '2px solid #3b313181'
        }

        // // TEXT AREA
        // if(validMessage.test(message)){
        //     setFormErrors(prevFormErrors => ({...prevFormErrors, message: ""}))
        //     refNameStyle.borderBottom = '2px solid #42ac79'
        // } else if (!validMessage.test(message) && message !== "") {
        //     setFormErrors(prevFormErrors => ({...prevFormErrors, message: "Min. 3, and only letters."}))
        //     refNameStyle.borderBottom = '2px solid red'
        // } else if (name.length === 0) {
        //     setFormErrors(prevFormErrors => ({...prevFormErrors, message: ""}))
        //     refNameStyle.borderBottom = '2px solid #3b313181'
        // }

    }, [name, email, phone, message]);

    // EMAILJS API

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm(
            'service_g2ofe15',
            'template_h0z5jjw', 
            form.current, 
            'ulJtPOUQPTfSAUx5o')
          .then((result) => {
              console.log(result.text);
              alert('Message send. Thank You!');
          }, (error) => {
              console.log(error.text);
          });
      };

    // HANDLER OF FORM
    // const ContactHandler = (event) => {
    //     event.preventDefault();
    //     // clear input values
    //     setName('');
    //     setEmail('');
    //     setPhone('');
    //     setMessage('')
    //     console.log(name, email, phone, message)
    // };
    

    return (
        <>
            <div className='contact'>
                <div className='contact-box'>
                    <form ref={form} onSubmit={sendEmail} className='message-column'>
                        <div className='message-element'>
                            <span className='message-element__title'>SEND ME A MESSAGE</span>
                        </div>
                        <div className='message-element'>
                            <input 
                                name='contact_name'
                                placeholder='FULL NAME'
                                ref={refInputName}
                                value={name}
                                onChange={nameChangeHandler}
                            ></input>
                            <p className='message-element__validation'>{formErrors.name}</p>
                        </div>
                        <div className='message-element'>
                            <input 
                                name='contact_email'
                                placeholder='YOUR EMAIL'
                                ref={refInputEmail}
                                value={email}
                                onChange={emailChangeHandler}
                            ></input>
                            <p className='message-element__validation'>{formErrors.email}</p>
                        </div>
                        <div className='message-element'>
                            <input 
                                name='contact_phone'
                                placeholder='PHONE(not required)'
                                ref={refInputPhone}
                                value={phone}
                                onChange={phoneChangeHandler}
                            ></input>
                            <p className='message-element__validation'>{formErrors.phonenumber}</p>
                        </div>
                        <div className='message-element'>
                            <textarea 
                                name='contact_message'
                                ref={textareaRef}
                                placeholder='YOUR MESSAGE'
                                rows={3}
                                value={message}
                                onChange={messageChangeHandler}    
                            ></textarea>
                            {/* <p className='message-element__validation'>{formErrors.message}</p> */}
                        </div>
                        <div className='message-button'>
                            <button 
                                className='message-button__item' 
                                type='submit'
                                value='Send'
                                ref={refButton}
                                // onClick={ContactHandler}
                                disabled={buttonDisabled}
                            >
                            SEND
                            </button>
                        </div>
                    </form>
                    <div className='contact-column'>
                        <div className='contact-element'>
                            <span className='contact-element__title'>CONTACT ME</span>
                        </div>
                        <div className='contact-element'>
                            <img alt='adress-icon' src={AdressImg}></img>
                            <span className='contact-element__adress'>WARSAW</span>
                        </div> 
                        <div className='contact-element'>
                            <img alt='adress-icon' src={PhoneImg}></img>
                            <span className='contact-element__phone'>+48 509 618 644</span>
                        </div>   
                        <div className='contact-element'>
                            <img alt='adress-icon' src={EmailImg}></img>
                            <span className='contact-element__email'>iwansky.piano@gmail.com</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Contact;
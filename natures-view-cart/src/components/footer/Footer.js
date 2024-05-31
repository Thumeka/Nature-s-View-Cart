import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

Modal.setAppElement('#root');

function Footer() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();

    const aboutUsContent = `
        Welcome to Natures View Cart, your go-to e-commerce platform for affordable, organic groceries. 
        We deliver high-quality organic products straight to your doorstep, ensuring a seamless shopping experience.
        Our mission is to make these benefits accessible to everyone, promoting a healthier lifestyle and a more sustainable planet. 
        We take pride in offering a wide range of organic groceries that cater to all your needs, from fresh produce to pantry staples.
    `;

    const ourServicesContent = `
        At Natures View Cart, we are committed to providing an exceptional shopping experience with our wide range of services: 

        1. **Organic Grocery Delivery**: We offer a diverse selection of organic groceries delivered straight to your doorstep, ensuring convenience and quality. 

        2. **Fresh Produce**: Our produce is sourced from trusted organic farms, guaranteeing freshness and sustainability. 
        3. **Customer Support**: Our dedicated support team is always ready to assist you with any inquiries or issues, ensuring a smooth shopping experience.

        4. **Secure Payment Options**: We provide multiple secure payment methods, including credit/debit cards, online banking, and digital wallets, to cater to your preferences.

        5. **Flexible Returns**: We have a customer-friendly return policy to ensure your satisfaction with every purchase. 
        6. **Exclusive Offers**: Enjoy special discounts and promotions available only to our registered customers, helping you save on your organic grocery needs.
    `;

    const privacyPolicyContent = `
        Privacy Policy for Nature's Cart, accessible from our website, is one of our main priorities in terms of privacy of our visitors. 

        This Privacy Policy document contains types of information that is collected and recorded by Nature's Cart and how we use it. 

        By using our website, you hereby consent to our Privacy Policy and agree to its terms. We collect personal information you are asked to provide, 

        and the reasons why you are asked to provide it will be made clear to you at the point we ask you to provide your personal information.
    `;

    const openModal = (content) => {
        setModalContent(content);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const navigateToCategory = (category) => {
        navigate(`/category/${category}`);
    };

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__row">
                    <div className="footer__column">
                        <h4>Company</h4>
                        <ul>
                            <li><button onClick={() => openModal(aboutUsContent)}>About Us</button></li>
                            <li><button onClick={() => openModal(ourServicesContent)}>Our Services</button></li>
                            <li><button onClick={() => openModal(privacyPolicyContent)}>Privacy Policy</button></li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <h4>Get Help</h4>
                        <ul>
                            <li><button onClick={() => openModal('Frequently asked questions...')}>FAQ</button></li>
                            <li><button onClick={() => openModal('Return policy details...')}>Returns</button></li>
                            <li><button onClick={() => openModal('How to check order status...')}>Order Status</button></li>
                            <li><button onClick={() => openModal('Payment options available...')}>Payment Options</button></li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <h4>Shop</h4>
                        <ul>
                            <li><button onClick={() => navigateToCategory('Vegetables')}>Vegetables</button></li>
                            <li><button onClick={() => navigateToCategory('Fruits')}>Fruits</button></li>
                            <li><button onClick={() => navigateToCategory('Dairy')}>Dairy</button></li>
                            <li><button onClick={() => navigateToCategory('Bakery')}>Bakery</button></li>
                            <li><button onClick={() => navigateToCategory('Poultry')}>Poultry</button></li>
                            <li><button onClick={() => navigateToCategory('Meat')}>Meat</button></li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <h4>Follow Us</h4>
                        <div className="footer__social-links">
                            <button><i className="fab fa-facebook-f"></i></button>
                            <button><i className="fab fa-twitter"></i></button>
                            <button><i className="fab fa-instagram"></i></button>
                            <button><i className="fab fa-linkedin-in"></i></button>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom">
                    <p>&copy; {currentYear} Natures View Cart. All rights reserved.</p>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Information Modal"
                className="modal"
                overlayClassName="overlay"
            >
                <button onClick={closeModal} className="modal-close-button">X</button>
                <div>{modalContent}</div>
            </Modal>
        </footer>
    );
}

export default Footer;

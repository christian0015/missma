import React, { useState, useEffect } from 'react';
import { getUsers, createPayment } from './api';
import './App.css';
import AOS from "aos"
import { Analytics } from "@vercel/analytics/react"

import logofestival from './components/assets/LogoFestival.jpg';
import place from './components/assets/place.png';
import pieces from './components/assets/pieces.png';
import ticket0 from './components/assets/ticket.png';
import ticket1 from './components/assets/ticket (1).png';
import ticket2 from './components/assets/ticket (2).png';

// Importer les images des candidates
import imageCandidate1 from './components/assets/ImgCandidates/Img-Candidate (1).jpg';
import imageCandidate2 from './components/assets/ImgCandidates/Img-Candidate (2).jpg';
import imageCandidate3 from './components/assets/ImgCandidates/Img-Candidate (3).jpg';
import imageCandidate4 from './components/assets/ImgCandidates/Img-Candidate (4).jpg';
import imageCandidate5 from './components/assets/ImgCandidates/Img-Candidate (5).jpg';
import imageCandidate6 from './components/assets/ImgCandidates/Img-Candidate (6).jpg';
import imageCandidate7 from './components/assets/ImgCandidates/Img-Candidate (7).jpg';
import imageCandidate8 from './components/assets/ImgCandidates/Img-Candidate (8).jpg';
import imageCandidate9 from './components/assets/ImgCandidates/Img-Candidate (9).jpg';
import imageCandidate10 from './components/assets/ImgCandidates/Img-Candidate (10).jpg';
import imageCandidate11 from './components/assets/ImgCandidates/Img-Candidate (11).jpg';
import imageCandidate12 from './components/assets/ImgCandidates/Img-Candidate (12).jpg';

import instagramLogo from './components/assets/instagram.png';
import tiktokLogo from './components/assets/tic-tac.png';

const imageMap = {
  1: imageCandidate1,
  2: imageCandidate2,
  3: imageCandidate3,
  4: imageCandidate4,
  5: imageCandidate5,
  6: imageCandidate6,
  7: imageCandidate7,
  8: imageCandidate8,
  9: imageCandidate9,
  10: imageCandidate10,
  11: imageCandidate11,
  12: imageCandidate12,
};

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  const handleVote = async (userId, amount) => {
    try {
      const response = await createPayment({ amount, userId });
      const { approval_url } = response.data;
      
      // Redirection vers PayPal pour le paiement
      window.location.href = approval_url;
    } catch (error) {
      console.error('Error creating PayPal payment:', error);
    }
  };



  // *****************************************************************
  AOS.init();
  // Fonction pour afficher les boutons de vote associés à un utilisateur
  const showcardVote = (event, userId) => {
    event.stopPropagation(); // Arrêter la propagation pour éviter que le clic ne se propage à l'extérieur
    const cardVote = document.querySelectorAll(`#user-${userId} .cardVote`);
    cardVote.forEach(buttons => {
      buttons.classList.add('show');
    });
  };

  // Fonction pour masquer tous les cardVote
  const hideAllcardVote = () => {
    const allcardVote = document.querySelectorAll('.cardVote');
    allcardVote.forEach(buttons => {
      buttons.classList.remove('show');
    });
  };

  // Écouter les clics en dehors des cardVote pour masquer tous les cardVote
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.cardVote') && !event.target.closest('.button')) {
      hideAllcardVote();
    }
  });

  // ******************************************************************************************



  return (
    <div className="App">
      <div className="back">
      <div className='headerContent'>
      <header>
        <nav>
        <a href="#home" className='logo'>Miss Africa Maroc</a>
          <div className='navlinks'>
            <a href="#home">Accueil</a>
            <a href="#candidates">Candidates</a>
            <a href="#about">À propos</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>
      </div>
        <section id="home" className="heroSection">
          {/* <h1>M i s s__A f r i c a__M a r o c__2 0 2 4</h1>
          <p>Un événement moderne et futuriste pour célébrer la beauté et l'élégance.</p> */}
        </section>
        </div>

        <section id="templa" className="template">
          <h1>M i s s_ A f r i c a_ M a r o c_ 2 0 2 4</h1>
          <p data-aos="fade-up">Un événement moderne et futuriste pour célébrer la beauté et l'élégance.</p>
        </section>

        <section id="template2" className="template2">
          <div className="template2Sous" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
            <img src={logofestival} className='logofestival' alt="logo festival" />
          </div>
          <h2>Evenementiel & Multicuturisme 2024</h2>
          <p data-aos="fade-up">Célébration de la beauté et culturele africaine</p>
            <br/><br/><br/>
        </section>

        

        <section id="candidates" className="candidatesSection">
        <span className='annoce'>Votez pour les candidates avec PayPal, <br/>
        Creation du compte en 5 clicks.</span>
          <center><h2 data-aos="fade-up">Candidates </h2></center>
          
        <div className='listCandidates'>
          {users.map(user => (
          <div className="candidate-grid" key={user.id} id={`user-${user.id}`} onClick={() => hideAllcardVote()}>
            {/* Exemple de carte candidate */}
            <div className="candidate-card" style={{backgroundImage:`url(${imageMap[user.id]})`}} data-aos="fade-up" data-aos-duration="1000">
              <img src={imageMap[user.id]} className='imgCard' alt="Candidate" />
              <h3><span className='cardinal'data-aos="fade-up">#{user.id}</span> <span>{user.fullName}</span></h3>
              <div>{user.city}</div>
              <div>{user.details}</div>
              <div className='divPlace'><img src={place} className='placeImg'/> <span data-aos="fade-up"  data-aos-anchor-placement="top-bottom">{user.points}</span></div>
              <center><button onClick={(event) => showcardVote(event, user.id)} className='buttonOption'><span>Vote</span><img src={pieces} className='placeImg'/></button></center>
            <div className='cardVote'>
              <button onClick={() => handleVote(user.id, 1)} className='voteButton'><span>Vote 1 DH</span> <img src={ticket2} className='placeImg'/></button>
              <button onClick={() => handleVote(user.id, 5)} className='voteButton'><span>Vote 5 DH</span> <img src={ticket1} className='placeImg'/></button>
              <button onClick={() => handleVote(user.id, 10)} className='voteButton'><span>Vote 10 DH</span> <img src={ticket0} className='placeImg'/></button>
            </div>
            </div>
            {/* Répétez pour d'autres candidates */}
          </div>
          ))}

          </div>
        
        </section>
        <section id="about" className="aboutSection">
          <h2 data-aos="fade-up">À propos de l'événement</h2>
          <p data-aos="fade-up">L'événement Miss Africa Maroc vise à promouvoir l'union et la diversité cutlurelle.</p>
        </section>
        <section id="contact" className="contactSection">
          <h2 data-aos="fade-up">Contact</h2>
          <form>
            <div className='input'><input type="text" placeholder="Nom" />
            <input type="email" placeholder="Email" /></div>
            
            <textarea placeholder="Message"></textarea>
            <button type='text'><a href='https://api.whatsapp.com/send/?phone=212775001221&text=Salut,%20je%20souhaite%20avoir%20plus%20d%27information%20sur%20Miss%20Africa%20Maroc'>Contactez nous</a></button>
          </form>
          <div className='linksReseau'>
          <a href='https://www.tiktok.com/@missafrica2024?is_from_webapp=1&sender_device=pc'><img src={tiktokLogo} className='linksReseauImg'/></a>
          <a href='https://www.instagram.com/miss_africa_maroc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='><img src={instagramLogo} className='linksReseauImg'/></a>
          </div>
        </section>
      <footer>
        <p>&copy;Miss Africa Maroc Edition 2024. Tous droits réservés.</p>
      </footer>
    </div>
    
  );
}

export default App;

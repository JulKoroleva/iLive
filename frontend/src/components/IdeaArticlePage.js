import React, { useEffect, useState } from 'react';
import Preloader from './Preloader';
import APIManager from '../utils/api';

function IdeaArticlePage(props) {
  const [markup, setMarkup] = useState('');
  const url = window.location.pathname; // Get the path from the URL
  const fileName = url.substring(url.lastIndexOf('/') + 1); // Get filename 

  const getIdeaArticle = async () => {
    try {
      const markup = await APIManager.getIdeaArticle(fileName, props.lang);
      setMarkup(markup);
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  useEffect(() => {
    getIdeaArticle();
  }, []);


  const handleScroll = () => {
    document.documentElement.style.setProperty('--scrollTop', `${window.scrollY}px`);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLazyLoad = () => {
    const lazyImages = document.querySelectorAll('.lazy-image');

    const imageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy-image');
          imageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(lazyImage => {
      imageObserver.observe(lazyImage);
    });
  };

  useEffect(() => {
    handleLazyLoad();
  }, []);



  return (
    <>
      {markup ? (
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', width: '100vw', height: '100%' }} dangerouslySetInnerHTML={{ __html: markup }} />
      ) : (
        <section className='page'><Preloader /> </section>

      )}

    </>
  );
}

export default IdeaArticlePage;

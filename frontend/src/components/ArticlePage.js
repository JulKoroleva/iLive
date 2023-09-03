import React, { useEffect, useState, useContext } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { TranslationContext } from '../context/TranslationContext';
import StickyHeader from './StickyHeader';
import APIManager from '../utils/api';

function ArticlePage(props) {
  const translation = useContext(TranslationContext);
  const [article, setArticle] = useState();
  const url = useLocation().pathname;
  const articleURL = url.substring(url.lastIndexOf('/') + 1);
  const navigate = useNavigate();

  const getArticle = async () => {
    try {
      const articleData = await APIManager.getArticle(articleURL);
      console.log('articleURL', articleURL)
      setArticle(articleData);
    } catch (error) {
      console.error('Error while getting data:', error);
      navigate('/login', { replace: true });
    }
  };


  useEffect(() => {
    getArticle();
  }, [articleURL]);

  return (
    <section className="page">
      <div className="page__sticky-header">
        <StickyHeader loggedIn={props.loggedIn} loggedOut={props.loggedOut} isMobile={props.isMobile}>
          <NavLink to="/profile" className="sticky-header__button_home"></NavLink>
        </StickyHeader>
      </div>

      <section className='article'>
        {article && (
          <>
            <div className='article__introduction'>
              <h1 className='article__introduction_title'>{article.introduction.title[translation.lang]}</h1>
              <h4 className='article__introduction_subtitle'>{article.introduction.subtitle[translation.lang]}</h4>
              <p className='article__introduction_tex'>{article.introduction.text[translation.lang]}</p>
            </div>

            <div className='article__paragraph'>
              <h2 className='article__paragraph_title'>{article.paragraphOne.title[translation.lang]}</h2>
              <p className='article__paragraph_text'>{article.paragraphOne.text[translation.lang]}</p>
              <div className='article__paragraph_tip'>
                {article.paragraphOne.advice ? (
                  <h5 className='article__paragraph_tip_text'>{article.paragraphOne.advice[translation.lang]}</h5>
                ) : (
                  <div style={{ margin: '0', padding: '0', display: 'none' }} ></div>
                )}
              </div>
            </div>

            <div className='article__paragraph'>
              <h2 className='article__paragraph_title'>{article.paragraphTwo.title[translation.lang]}</h2>
              <p className='article__paragraph_text'>{article.paragraphTwo.text[translation.lang]}</p>
              <div className='article__paragraph_tip'>
                {article.paragraphTwo.advice ? (
                  <h5 className='article__paragraph_tip_text'>{article.paragraphTwo.advice[translation.lang]}</h5>
                ) : (
                  <div style={{ margin: '0', padding: '0', display: 'none' }} ></div>
                )}
              </div>
            </div>

            <div className='article__paragraph'>
              <h2 className='article__paragraph_title'>{article.paragraphThree.title[translation.lang]}</h2>
              <p className='article__paragraph_text'>{article.paragraphThree.text[translation.lang]}</p>
              <div className='article__paragraph_tip'>
                {article.paragraphThree.advice ? (
                  <h5 className='article__paragraph_tip_text'>{article.paragraphThree.advice[translation.lang]}</h5>
                ) : (
                  <div style={{ margin: '0', padding: '0', display: 'none' }} ></div>
                )}
              </div>
            </div>

            {article?.paragraphFour && (
              <div className='article__paragraph'>
                <h2 className='article__paragraph_title'>{article.paragraphFour.title[translation.lang]}</h2>
                <p className='article__paragraph_text'>{article.paragraphFour.text[translation.lang]}</p>
                <div className='article__paragraph_tip'>
                  {article.paragraphFour.advice ? (
                    <h5 className='article__paragraph_tip_text'>{article.paragraphFour.advice[translation.lang]}</h5>
                  ) : (
                    <div style={{ margin: '0', padding: '0', display: 'none' }} ></div>
                  )}
                </div>
              </div>
            )}

            {article?.paragraphFive && (
              <div className='article__paragraph'>
                <h2 className='article__paragraph_title'>{article.paragraphFive.title[translation.lang]}</h2>
                <p className='article__paragraph_text'>{article.paragraphFive.text[translation.lang]}</p>
                <div className='article__paragraph_tip'>
                  {article.paragraphFive.advice ? (
                    <h5 className='article__paragraph_tip_text'>{article.paragraphFive.advice[translation.lang]}</h5>
                  ) : (
                    <div style={{ margin: '0', padding: '0', display: 'none' }} ></div>
                  )}
                </div>
              </div>
            )}

            {article?.paragraphSix && (
              <div className='article__paragraph'>
                <h2 className='article__paragraph_title'>{article?.paragraphSix.title[translation.lang]}</h2>
                <p className='article__paragraph_text'>{article.paragraphSix.text[translation.lang]}</p>
                <div className='article__paragraph_tip'>
                  {article.paragraphSix.advice ? (
                    <h5 className='article__paragraph_tip_text'>{article.paragraphSix.advice[translation.lang]}</h5>
                  ) : (
                    <div style={{ margin: '0', padding: '0', display: 'none' }} ></div>
                  )}
                </div>
              </div>
            )}


            <div className='article__conclusion'>
              <h3>{article.conclusion[translation.lang]}</h3>
            </div>
          </>
        )}
      </section>
    </section>
  );
}

export default ArticlePage;

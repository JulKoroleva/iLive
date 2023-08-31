<svg fill="none" viewBox="0 0 600 300" width="600" height="300" xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <style>
        @keyframes hi  {
            0% { transform: rotate( 0.0deg) }
           10% { transform: rotate(14.0deg) }
           20% { transform: rotate(-8.0deg) }
           30% { transform: rotate(14.0deg) }
           40% { transform: rotate(-4.0deg) }
           50% { transform: rotate(10.0deg) }
           60% { transform: rotate( 0.0deg) }
          100% { transform: rotate( 0.0deg) }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .container {
          background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;

          width: 100%;
          height: 300px;

          display: flex;
          justify-content: center;
          align-items: center;
          color: white;

          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }

        .hi {
          animation: hi 1.5s linear -0.5s infinite;
          display: inline-block;
          transform-origin: 70% 70%;
        }

        @media (prefers-reduced-motion) {
          .container {
            animation: none;
          }

          .hi {
            animation: none;
          }
        }
      </style>

      <div class="container">
        <h1>Hi there, my name is Nikola <div class="hi">👋</div></h1>
      </div>
    </div>
  </foreignObject>
</svg> 

# iLive 

💡 iLive is a platform dedicated to individuals striving for self-improvement. This website offers a diverse range of resources to inspire and uplift users without imposing any obligations. The main goal is to provide a space where users can explore articles, engage with creative ideas, share their experiences through photos, and track their personal growth over time. iLive offers a variety of content and features to inspire and empower users on their personal growth journey. This README provides a comprehensive overview of the iLive project, its various pages, and functionalities.

## Сontent
Here's a detailed guide to the various sections and features of the iLive website:

-   [Introduction](#introduction)
-   [Pages](#pages)
    -   [Homepage](#homepage)
    -   [Articles](#articles)
    -   [Tests](#tests)
    -   [Ideas](#ideas)
    -   [Photogallery](#photo-gallery)
    -   [User Profile](#user-profile)
	     -   [Ideas list](#user-ideas)
        -   [Sketchpad](#user-sketchpad)
        -   [Calendar](#user-calendar)
-  [Future Plans](#future-plans)
- [Getting Started](#getting-started)
- [Browser Compatibility](#browser-compatibility)

## Introduction

iLive is a platform dedicated to enhancing the lives of its users. With a focus on providing ideas and inspiration, the website offers a range of content and interactive features. It encourages users to explore new concepts, learn from articles, engage in quizzes, and share their experiences through photos.

## Pages
<a name="pages"></a>


### Homepage
<a name="homepage"></a>

The home page warmly welcomes users, offering an overview of the site's purpose. It serves as an entry point, setting the tone for the user's journey on the platform.

### Articles
<a name="articles"></a>

The articles page hosts a collection of articles covering various topics. These articles are not only informative but also include valuable advice to help users improve their lives in different aspects.

### Tests
<a name="tests"></a>

The quizzes page (currently in development) will feature interactive quizzes aimed at engaging users in a fun and informative way.

### Ideas
<a name="ideas"></a>

The ideas page presents users with a set of idea cards. These ideas are randomly generated from a list and can be managed using three buttons: delete (permanently removes the idea), postpone, and add to personal idea list. Some ideas come with additional features, including thematic articles that delve deeper into the concept and offer guidance on how to realize it.

### Photo Gallery
<a name="photo-gallery"></a>

The photo gallery is a special space where users can share their photos along with captions and descriptions. Users can upload their images, create photo reports, and share their impressions and experiences. Photos can be liked, expanded for a closer view, and organized based on user-generated content.

### User Profile
<a name="user-profile"></a>

The user profile page is a personalized hub for users. They can customize their profiles by adding avatars, updating their names, birthdates, and inspirational quotes. The profile also includes:

#### Sketchpad
<a name="user-sketchpad"></a>

A section equipped with a drawing tool, allowing users to take notes or doodle freely.

#### Calendar
<a name="user-calendar"></a>

Users can input their birthdate to generate a special table that displays their lived years, months, weeks, and days. Empty cells represent the remaining time. Note that the calculations might deviate from real-time by approximately ±5 days.

## Future Plans
<a name="future-plans"></a>

The iLive project has exciting plans for the future, including expanding the articles section with more informative content and enriching the idea pool. We're committed to enhancing user experience and continually providing valuable resources for personal growth and development.

## Getting Started
<a name="getting-started"></a>

## Browser Compatibility
<a name="browser-compatibility"></a>

Thank you for joining us on this journey of self-improvement and inspiration with iLive!

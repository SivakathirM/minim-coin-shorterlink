import React from 'react'

const About = () => {
  return (
    <div className='bg-[#73787F] w-full h-auto lg:h-[40vh]'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1'>
        <div className='max-sm:mx-2 ml-2 my-2 w-12/12 bg-white p-2 rounded-md'>
            <h2 className='font-semibold pb-0.5'>URL Statistics Tracking: Short URL, Date, Clicks and Original URL</h2>
            <p >Monitor advanced link performance statistics details: shorten link, created date, overall clicks and source primary link Helpful solution for tracking and analyzing your links with instant results.</p>
        </div>
        <div className='max-sm:mx-2 max-sm:-mt-1 ml-2 my-2 w-12/12 bg-white p-2 rounded-md'>
            <h2 className='font-semibold pb-0.5'>Features: Free, Fast, Easy and Secure</h2>
            <p >URL shortening made easy, fast and as simple as possible! 100% free, super-fast, secure and user-friendly way to delink your links and have the best sharing experience.</p>
        </div>
        <div className='max-sm:mx-2 max-sm:-mt-1 ml-2 my-2 w-12/12 bg-white p-2 rounded-md'>
            <h2 className='font-semibold pb-0.5'>Benefits of Using a URL Shortener</h2>
            <p >URL shorteners offer numerous advantages for individuals and businesses looking to optimize their online presence. Here are some key benefits
            </p>
        </div>
        <div className='max-sm:-mt-1 mx-2 my-2 w-12/12 bg-white p-2 rounded-md'>
            <h2 className='font-semibold pb-0.5'>Reliable: Spam, virus, and malware URLs are removed</h2>
            <p >Insurance that all links spreading spam, viruses, and malware are automatically removed, maintaining a safe and secure browsing experience for users.
            </p>
        </div>
      </div>
    </div>
  )
}

export default About

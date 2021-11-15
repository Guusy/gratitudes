import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { prisma } from './api/_base';

export default function Blog({ gratitudes = [] }) {
  console.log('gra',gratitudes);
  const addGratitude = () => {
    fetch('/api/gratitudes', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ 
        title: 'hello',
        item_1:'d3',
        item_2:'d2'
      }), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }
  return (
    <ul>
      {gratitudes.map((gratitude) => (
        <li key={gratitudes.id}>{gratitude.title}</li>
      ))}
      <button onClick={addGratitude}> Add </button>
    </ul>
  )
}
// function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const gratitudes = await prisma.gratitude.findMany();
  console.log('SSr',gratitudes);
  console.log('JSON.stringify(gratitudes)',JSON.stringify(gratitudes));
  return {
    props: {
      gratitudes: JSON.parse(JSON.stringify(gratitudes)),
    },
  }
}

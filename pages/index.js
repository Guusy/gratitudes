import { Card, CardContent } from '@mui/material';
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import AddGratitudeDialog from '../components/AddGratitudeDialog';
import GratitudesFilters from '../components/GratitudesFilters';
import styles from '../styles/Home.module.css'
import { prisma } from './api/_base';

export default function Blog({ gratitudes = [] }) {
  const [gratitudesState, setGratitudesState] = useState(gratitudes)
  const onChangeFilters = (newGratitudes) => {
    setGratitudesState(newGratitudes)
  }
  return (
    <div className={styles.container}>
      <GratitudesFilters gratitudes={gratitudes} onFilter={onChangeFilters} />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
        {gratitudesState.map((gratitude) => (
          <Card key={gratitudes.id} style={{ marginBottom: '1rem' }}>
            <CardContent>
              {gratitude.title}
              <ul>
                <li>
                  {gratitude.item_1}
                </li>
                <li>
                  {gratitude.item_2}
                </li>
                <li>
                  {gratitude.item_3}
                </li>
                <li>
                  {gratitude.item_4}
                </li>
                <li>
                  {gratitude.item_5}
                </li>
              </ul>
              {gratitude.createdAt.split('T')[0]}
            </CardContent>
          </Card>
        ))}
      </div>
      <AddGratitudeDialog />
    </div>
  )
}
// function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const gratitudes = await prisma.gratitude.findMany();
  return {
    props: {
      gratitudes: JSON.parse(JSON.stringify(gratitudes)),
    },
  }
}

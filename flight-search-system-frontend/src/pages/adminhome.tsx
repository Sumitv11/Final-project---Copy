import Layout, { child } from '@/Components/Layout';
import React from 'react'

const adminhome = ({ children }: child) => {
  return (
    <Layout>
      <main>{children}</main>
     </Layout>
  )
}
export default adminhome;

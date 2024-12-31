import { Html, Head, Main, NextScript } from 'next/document'

export default function Document({nonce}:{nonce:string}) {
    return (
        <Html lang="he">
      <Head nonce={nonce}/>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import React from 'react'

export const getServerSideProps = (async (context) => {


    const nonce = context.res?.getHeader("x-nonce") as string
    return { props: { nonce } }
}) satisfies GetServerSideProps<{ nonce: string }>

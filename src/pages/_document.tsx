import { GetServerSideProps } from 'next';
import { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import React from 'react';
import cookie from 'cookie';

interface MyDocumentProps {
    nonce: string;
}

const MyDocument: React.FC<MyDocumentProps> = ({ nonce }) => {
    return (
        <Html>
            <Head>
                <script
                    nonce={nonce}
                    dangerouslySetInnerHTML={{
                        __html: `console.log('Global nonce applied in Document!');`,
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript nonce={nonce} />
            </body>
        </Html>
    );
};

interface PageProps {
  nonce: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
    const cookies = context.req.headers.cookie || '';
    const parsedCookies = cookie.parse(cookies); // Parse the cookies
    const nonce = parsedCookies.nonce || ''; // Extract the nonce from cookies

    return { props: { nonce } };
};


export default MyDocument;
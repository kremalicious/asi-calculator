import { Logo } from '@/components/Logo'
import { title, description, font } from '@/constants'
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fontDataBold = await fetch(
    new URL('./opengraph-image-assets/HankenGrotesk-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())
  const fontDataRegular = await fetch(
    new URL(
      './opengraph-image-assets/HankenGrotesk-Regular.ttf',
      import.meta.url
    )
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 0%, rgb(27, 40, 62) 0%, rgb(15, 18, 33) 30%, rgb(0, 0, 0) 100%)',
          color: 'rgba(220, 220, 220, .7)',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'left',
          padding: '0 120px 0 180px'
        }}
      >
        <h1
          style={{
            fontSize: 90,
            marginBottom: '0',
            color: 'white',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Logo
            style={{
              width: '1.1em',
              height: '.8em',
              marginRight: '.5rem'
            }}
          />
          {title}
        </h1>
        <p style={{ fontSize: 43, marginTop: '0', paddingLeft: '6.5rem' }}>
          {description}
        </p>
        <p
          style={{
            fontSize: 30,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '6.5rem'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 512 512"
            style={{ marginRight: '0.25em', borderRadius: '50%' }}
          >
            <rect fill="#e7eef4" width="512" height="512" />
            <path
              fill="#6b7f88"
              d="M397,91 L421,115 L114,421 L91,398 L397,91 Z M397,182 L421,206 L205,421 L182,398 L397,182 Z M307,91 L330,115 L114,330 L91,307 L307,91 Z"
            />
          </svg>
          <span>krema.eth</span>
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Hanken Grotesk',
          data: fontDataBold,
          style: 'normal',
          weight: 700
        },
        {
          name: 'Hanken Grotesk',
          data: fontDataRegular,
          style: 'normal',
          weight: 400
        }
      ]
    }
  )
}

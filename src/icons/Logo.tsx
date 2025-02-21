export default function LogoIcon({ big, small }: { big?: boolean; small?: boolean }) {
  const size = big ? '144px' : small ? '34px' : '40px'
  return <img height={size} width={size} src='/arkade-icon-rounded.png' />
}

export function LogoIconSvg({ big }: { big?: boolean }) {
  return (
    <svg
      width={big ? '144' : '40'}
      height={big ? '144' : '40'}
      viewBox='0 0 144 144'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_1229_1621)'>
        <rect width='144' height='144' rx='19.125' fill='url(#paint0_linear_1229_1621)' />
        <g style={{ mixBlendMode: 'overlay' }}>
          <mask
            id='mask0_1229_1621'
            style={{ maskType: 'alpha' }}
            maskUnits='userSpaceOnUse'
            x='-22'
            y='-21'
            width='187'
            height='187'
          >
            <circle cx='71.9286' cy='72.0716' r='92.952' fill='url(#paint1_radial_1229_1621)' />
          </mask>
          <g mask='url(#mask0_1229_1621)'>
            <rect x='-28.373' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='3.74414' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='7.48779' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='11.2319' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='14.9761' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='18.7202' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='22.4639' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='26.208' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='29.9521' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='33.6958' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='37.4399' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='41.1841' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='44.9282' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='48.6719' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='52.416' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='56.1602' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='59.9038' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='63.6479' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='67.3921' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='71.1362' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='74.8799' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='78.624' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='82.3682' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='86.1118' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='89.856' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='93.6001' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='97.3442' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='101.088' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='104.832' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='108.576' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='112.32' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='116.064' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='119.808' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='123.552' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='127.296' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='131.04' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='134.784' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='138.528' width='200.853' height='1.008' fill='#D9D9D9' />
            <rect x='-28.373' y='142.272' width='200.853' height='1.008' fill='#D9D9D9' />
          </g>
        </g>
        <g opacity='0.1' filter='url(#filter0_f_1229_1621)'>
          <ellipse cx='74.6636' cy='3.45577' rx='54.648' ry='38.592' fill='white' />
        </g>
        <g opacity='0.1' filter='url(#filter1_f_1229_1621)'>
          <ellipse cx='74.6642' cy='-5.61596' rx='42.84' ry='30.24' fill='white' />
        </g>
        <g opacity='0.1' filter='url(#filter2_f_1229_1621)'>
          <ellipse cx='74.6681' cy='-5.61643' rx='26.424' ry='18.72' fill='white' />
        </g>
        <g opacity='0.1' filter='url(#filter3_f_1229_1621)'>
          <ellipse cx='74.6636' cy='153.504' rx='54.648' ry='18.72' fill='white' />
        </g>
        <g opacity='0.1' filter='url(#filter4_f_1229_1621)'>
          <ellipse cx='74.6636' cy='144' rx='54.648' ry='38.592' fill='white' />
        </g>
        <g filter='url(#filter5_diiiiiiii_1229_1621)'>
          <path
            d='M72.0703 63.8032C74.1036 63.8569 75.7527 65.4878 75.8156 67.5312L76.5016 89.8067C76.5752 92.1976 77.7278 94.4267 79.6367 95.8702L92.2113 105.379C92.892 105.893 93.7224 106.172 94.5762 106.172C102.071 106.172 106.995 98.3509 103.75 91.6002L80.7341 43.722C79.1138 40.3514 75.9835 37.9687 72.0703 37.9688C68.3508 37.9687 65.0269 40.3514 63.4065 43.722L40.3909 91.6002C37.1458 98.3509 42.0695 106.172 49.5644 106.172C50.4182 106.172 51.2486 105.893 51.9294 105.379L64.5039 95.8702C66.4128 94.4267 67.5654 92.1976 67.6391 89.8067L68.325 67.5312C68.3879 65.4878 70.037 63.8569 72.0703 63.8032Z'
            fill='url(#paint2_linear_1229_1621)'
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_f_1229_1621'
          x='-28.9444'
          y='-84.0962'
          width='207.217'
          height='175.104'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='24.48' result='effect1_foregroundBlur_1229_1621' />
        </filter>
        <filter
          id='filter1_f_1229_1621'
          x='14.5442'
          y='-53.136'
          width='120.24'
          height='95.04'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='8.64' result='effect1_foregroundBlur_1229_1621' />
        </filter>
        <filter
          id='filter2_f_1229_1621'
          x='30.9641'
          y='-41.6164'
          width='87.4077'
          height='71.9999'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='8.64' result='effect1_foregroundBlur_1229_1621' />
        </filter>
        <filter
          id='filter3_f_1229_1621'
          x='2.73562'
          y='117.504'
          width='143.857'
          height='71.9999'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='8.64' result='effect1_foregroundBlur_1229_1621' />
        </filter>
        <filter
          id='filter4_f_1229_1621'
          x='-28.9444'
          y='56.4477'
          width='207.217'
          height='175.104'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur stdDeviation='24.48' result='effect1_foregroundBlur_1229_1621' />
        </filter>
        <filter
          id='filter5_diiiiiiii_1229_1621'
          x='34.479'
          y='33.9367'
          width='75.1826'
          height='80.0111'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='2.88' />
          <feGaussianBlur stdDeviation='2.448' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1229_1621' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1229_1621' result='shape' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology radius='0.72' operator='erode' in='SourceAlpha' result='effect2_innerShadow_1229_1621' />
          <feOffset dy='-4.032' />
          <feGaussianBlur stdDeviation='3.528' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
          <feBlend mode='normal' in2='shape' result='effect2_innerShadow_1229_1621' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology radius='0.72' operator='erode' in='SourceAlpha' result='effect3_innerShadow_1229_1621' />
          <feOffset />
          <feGaussianBlur stdDeviation='1.512' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
          <feBlend mode='normal' in2='effect2_innerShadow_1229_1621' result='effect3_innerShadow_1229_1621' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology radius='0.72' operator='erode' in='SourceAlpha' result='effect4_innerShadow_1229_1621' />
          <feOffset />
          <feGaussianBlur stdDeviation='1.512' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
          <feBlend mode='normal' in2='effect3_innerShadow_1229_1621' result='effect4_innerShadow_1229_1621' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology radius='0.72' operator='erode' in='SourceAlpha' result='effect5_innerShadow_1229_1621' />
          <feOffset />
          <feGaussianBlur stdDeviation='1.512' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
          <feBlend mode='normal' in2='effect4_innerShadow_1229_1621' result='effect5_innerShadow_1229_1621' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology radius='0.72' operator='erode' in='SourceAlpha' result='effect6_innerShadow_1229_1621' />
          <feOffset />
          <feGaussianBlur stdDeviation='1.512' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
          <feBlend mode='normal' in2='effect5_innerShadow_1229_1621' result='effect6_innerShadow_1229_1621' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology radius='0.72' operator='erode' in='SourceAlpha' result='effect7_innerShadow_1229_1621' />
          <feOffset dy='1.152' />
          <feGaussianBlur stdDeviation='2.664' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
          <feBlend mode='normal' in2='effect6_innerShadow_1229_1621' result='effect7_innerShadow_1229_1621' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology radius='0.72' operator='erode' in='SourceAlpha' result='effect8_innerShadow_1229_1621' />
          <feOffset dy='1.152' />
          <feGaussianBlur stdDeviation='2.664' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
          <feBlend mode='normal' in2='effect7_innerShadow_1229_1621' result='effect8_innerShadow_1229_1621' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feMorphology radius='0.72' operator='erode' in='SourceAlpha' result='effect9_innerShadow_1229_1621' />
          <feOffset dy='1.152' />
          <feGaussianBlur stdDeviation='2.664' />
          <feComposite in2='hardAlpha' operator='arithmetic' k2='-1' k3='1' />
          <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0' />
          <feBlend mode='normal' in2='effect8_innerShadow_1229_1621' result='effect9_innerShadow_1229_1621' />
        </filter>
        <linearGradient id='paint0_linear_1229_1621' x1='72' y1='0' x2='72' y2='144' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#292929' />
          <stop offset='1' stopColor='#070707' />
        </linearGradient>
        <radialGradient
          id='paint1_radial_1229_1621'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(71.9286 72.1355) rotate(90) scale(86.4358)'
        >
          <stop stopColor='#D9D9D9' />
          <stop offset='1' stopColor='#737373' stopOpacity='0' />
        </radialGradient>
        <linearGradient
          id='paint2_linear_1229_1621'
          x1='72.0703'
          y1='37.9687'
          x2='72.0703'
          y2='106.172'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#F2F2F2' />
          <stop offset='0.214353' stopColor='#FBFBFB' />
          <stop offset='0.633069' stopColor='#F6F6F6' />
          <stop offset='0.767272' stopColor='#BABABA' />
          <stop offset='1' stopColor='#C8C8C8' />
        </linearGradient>
        <clipPath id='clip0_1229_1621'>
          <rect width='144' height='144' rx='19.125' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

import CWLandingComponent from './cw-landing/cw-landing-component'
import CWHomeComponent from './cw-home/cw-home-component'

export const CW_ROUTES = [
  {
    path: '/',
    element: <CWLandingComponent />
  },
    {
      path: 'home',
      element: <CWHomeComponent />
    },
]

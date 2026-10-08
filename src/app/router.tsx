import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { AppShell } from '@/components/layout/AppShell'
import { ROUTES } from '@/constants/routes'
import { PageSkeleton } from '@/components/ui/Skeleton'

// Lazy-loaded pages
const HomePage = lazy(() => import('@/pages/app/HomePage'))
const PrayersPage = lazy(() => import('@/pages/app/PrayersPage'))
const PrayerDetailPage = lazy(() => import('@/pages/app/PrayerDetailPage'))
const RosaryPage = lazy(() => import('@/pages/app/RosaryPage'))
const HoursClockPage = lazy(() => import('@/pages/app/HoursClockPage'))
const ExaminationPage = lazy(() => import('@/pages/app/ExaminationPage'))
const DiscoverPage = lazy(() => import('@/pages/app/DiscoverPage'))
const AssistantPage = lazy(() => import('@/pages/app/AssistantPage'))
const CommunityPage = lazy(() => import('@/pages/app/CommunityPage'))
const ProfilePage = lazy(() => import('@/pages/app/ProfilePage'))
const OnboardingPage = lazy(() => import('@/pages/onboarding/OnboardingPage'))

const router = createBrowserRouter([
  {
    path: ROUTES.ONBOARDING,
    element: (
      <Suspense fallback={<PageSkeleton />}>
        <OnboardingPage />
      </Suspense>
    ),
  },
  {
    element: <AppShell />,
    children: [
      {
        index: true,
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PRAYERS,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <PrayersPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PRAYER_DETAIL,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <PrayerDetailPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ROSARY,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <RosaryPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.HOURS_CLOCK,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <HoursClockPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.EXAMINATION,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ExaminationPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.DISCOVER,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <DiscoverPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ASSISTANT,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <AssistantPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.COMMUNITY,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <CommunityPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.PROFILE,
        element: (
          <Suspense fallback={<PageSkeleton />}>
            <ProfilePage />
          </Suspense>
        ),
      },
      // Redireciona rotas desconhecidas para home
      { path: '*', element: <Navigate to={ROUTES.HOME} replace /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}

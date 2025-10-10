import AppFooter from '@/components/app-footer';
import AppHeader from '@/components/app-header';
import BackgroundPattern from '@/components/bg-pattern';
import PetListStoreInitializer from '@/components/store-init/store-initializer';
import { Toaster } from '@/components/ui/sonner';
import { checkAuth, getPetsByUserId } from '@/lib/server-utils';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await checkAuth();
  const pets = await getPetsByUserId(session.user.id);

  return (
    <>
      <BackgroundPattern />

      <div className="flex flex-col max-w-[1050px] mx-auto px-4 min-h-screen">
        <AppHeader />

        <PetListStoreInitializer petList={pets}>
          {children}
        </PetListStoreInitializer>

        <AppFooter />
      </div>

      <Toaster position="top-right" />
    </>
  );
}

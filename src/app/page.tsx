import { Button } from '@/components/ui/button';
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default function Home() {
  return (
    <main className='flex items-center justify-center bg-background flex-1'>
      <div className='relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12'>
        <div className='max-w-3xl mx-auto text-center'>
          <div className=''>
            <span className='w-auto px-6 py-3 rounded-full bg-secondary'>
              <span className='text-sm font-medium text'>
                Sort all notes easily
              </span>
            </span>
            <h1 className='mt-10 text-3xl font-extrabold tracking-tight lg:text-6xl'>
              Organize Your Thoughts Simplify Your Life
            </h1>
            <p className='max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground'>
              Whether you&apos;re a student, professional, or just someone who
              loves to jot down thoughts, our app provides a seamless and
              intuitive experience. With features like rich text formatting,
              tagging, and search, you can easily manage everything.
            </p>
            <div className='flex mt-10 justify-center max-w-sm mx-auto'>
              <RegisterLink>
                <Button size={'lg'}>Sign up for free</Button>
              </RegisterLink>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

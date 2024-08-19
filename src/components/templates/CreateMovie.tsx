'use client'

import { useFormCreateMovie } from '../forms/createMovie'
// import { trpcClient } from '@/trpc/clients/client'
import { useToast } from '../molecules/Toaster/use-toast'
import { useCreateMovie } from '@/app/axios'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
// import { Genre } from '@prisma/client'
import { HtmlSelect } from '../atoms/select'

import { Button } from '../atoms/button'
import { useRouter } from 'next/navigation'
import { revalidatePath } from '../utils/actions/revalidatePath'
import { ImagePreview } from '../molecules/ImagePreview'
import { useImageUpload } from '../utils/hooks/index'
import { Controller } from 'react-hook-form'
import { ProgressBar } from '../molecules/ProgressBar'

enum Genre {
  Action = "Action",
  Comedy = "Comedy",
  Horror = "Horror",
  Drama = "Drama",
  Brutal = "Brutal",
}
export interface ICreateMovieProps {}

export const CreateMovie = ({}: ICreateMovieProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    resetField,
    control,
  } = useFormCreateMovie()
  const movieData: {
    title: string;
    director: string;
    releaseDate: string;
  }=
    {
      title: "Inception",
      director: "Christopher Nolan",
      releaseDate: "2010-07-16",
    };
  
  // const { isLoading, handleCreateMovie } = useCreateMovie();
  // const onSubmit = async (data: any) => {
  //   try {
  //     // const newMovie = await handleCreateMovie(data); // Call the Axios function
  //     console.log('Movie created:', newMovie);
  //     reset(); // Optionally reset the form after successful creation
  //   } catch (error) {
  //     console.error('Error creating movie:', error);
  //     // Handle error (e.g., show an error message)
  //   }
  // };
    
  const { posterUrl } = watch()

  const { toast } = useToast()
  const { replace } = useRouter()

  const [{ percent, uploading }, uploadImages] = useImageUpload()

  return (
    <div>
      <form
        onSubmit={handleSubmit(
          async ({ director, duration, genre, releaseDate, title }) => {
            const uploadedImages = await uploadImages(posterUrl)

            await onSubmit({
              director,
              duration,
              genre,
              releaseDate,
              title,
              posterUrl: uploadedImages[0],
            })
            reset()
            toast({ title: 'Movie created successfully.' })
            revalidatePath('admins/movies')
            replace('/admin/movies')
          },
        )}
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label title="title" error={errors.title?.message}>
              <Input placeholder="Title" {...register('title')} />
            </Label>
            <Label title="director name" error={errors.director?.message}>
              <Input placeholder="Director name" {...register('director')} />
            </Label>
            <Label title="Duration" error={errors.duration?.message}>
              <Input
              type='time'
                placeholder="Duration"
                {...register('duration', { valueAsNumber: true })}
              />
            </Label>
            <Label title="Release date" error={errors.releaseDate?.message}>
              <Input
                placeholder="Release date"
                type="date"
                {...register('releaseDate', {
                  setValueAs: (value) => {
                    const date = new Date(value)
                    return isNaN(date.getTime()) ? '' : date.toISOString()
                  },
                })}
              />
            </Label>
            <Label title="Genre" error={errors.genre?.message}>
              <HtmlSelect placeholder="projection type" {...register(`genre`)}>
                {Object.values(Genre).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </HtmlSelect>
            </Label>
          </div>
          <Label title="Images" error={errors.posterUrl?.message?.toString()}>
            <ImagePreview
              src={posterUrl || ''}
              clearImage={() => resetField('posterUrl')}
            >
              <Controller
                control={control}
                name={`posterUrl`}
                render={({ field }) => (
                  <Input
                    type="file"
                    accept="image/*"
                    multiple={false}
                    onChange={(e) => field.onChange(e?.target?.files)}
                  />
                )}
              />
            </ImagePreview>

            {percent > 0 ? <ProgressBar value={percent} /> : null}
          </Label>
        </div>
        {/* <Button loading={isLoading || uploading} type="submit"> */}
          Submit
        {/* </Button> */}
      </form>
    </div>
  )
}

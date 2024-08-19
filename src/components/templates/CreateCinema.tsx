"use client";
import { Label } from "../atoms/label";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import React from "react";
import { useFormContext, useWatch, useFieldArray } from "react-hook-form";
import { HtmlSelect } from "../atoms/select";
import {
  FormProviderCreateCinema,
  FormTypeCreateCinema,
} from "../forms/createCinema";
import { useToast } from "../molecules/Toaster/use-toast";
import { TextArea } from "../atoms/textArea";
import { SimpleAccordion } from "../molecules/SimpleAccordion";
import { Antenna, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { revalidatePath } from "../utils/actions/revalidatePath";
import { Square } from "../organism/map/ScreenUtils";

enum ProjectionType {
  Imax = "Imax",
  FourK = "4k",
  Atoms = "Atoms",
  Imax4k = "Imax4k",
  Normal = "Normal",
}

enum SoundSystemType {
  Dolby = "Dolby",
  HighAmplifier = "HighAmplifier",
  Normal = "Normal",
  DOLBY_ATMOS = "Ddolby_Atmos",
}

export interface ICreateCinemaProps {}

export const CreateCinema = () => (
  <FormProviderCreateCinema>
    <CreateCinemaContent />
  </FormProviderCreateCinema>
);

export const CreateCinemaContent = ({}: ICreateCinemaProps) => {
  const { register, handleSubmit, setValue, reset } =
    useFormContext<FormTypeCreateCinema>();

  const createCinema = async (cinemaData: FormTypeCreateCinema) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cinema/cinema",
        cinemaData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create cinema"
      );
    }
  };

  const onSubmit = async (data: FormTypeCreateCinema) => {
    try {
      await createCinema(data);
      reset();
      toast({ title: "Cinema created successfully." });
      replace("/admin/cinemas");
    } catch (error: any) {
      toast({ title: error.message, variant: "destructive" });
    }
  };

  const { toast } = useToast();
  const { replace } = useRouter();

  return (
    <div className="">
      <div className="my-10 font-bold text-4xl underline underline-offset-8  ">
        <h1>Create Cinema</h1>
      </div>
      <form
        onSubmit={handleSubmit(
          async ({
            address: { address, lat, lng },
            cinemaName,
            screens,
            managerId,
          }) => {
            await createCinema({
              managerId,
              cinemaName,
              address: {
                address,
                lat,
                lng,
              },
              screens,
            });
            reset();
            toast({ title: "Cinema created successfully." });
            revalidatePath("admins/cinemas");
            replace("/admin/cinemas");
          }
        )}
        className=""
      >
        <Label title="Cinema" className="text-2xl">
          <Input placeholder="Cinema name" {...register("cinemaName")} />
        </Label>
        <Label className="text-2xl" title="Manager ID">
          <Input placeholder="Manager ID" {...register("managerId")} />
        </Label>

        <Label title="Address" className="text-2xl">
          <TextArea placeholder="Address" {...register("address.address")} />
        </Label>
        <AddScreens />

        <Button type="submit" className="mt-6 dark:text-black">
          Create cinema
        </Button>
      </form>
    </div>
  );
};

const AddScreens = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormTypeCreateCinema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `screens`,
  });

  const { screens } = useWatch<FormTypeCreateCinema>();

  return (
    <div>
      {fields.map((item: any, screenIndex: any) => (
        <SimpleAccordion title={screenIndex + 1 || "[Empty]"} key={item.id}>
          <div className={`flex justify-end my-2`}>
            <Button
              variant="link"
              size="sm"
              className="text-sm text-gray-600 underline underline-offset-2"
              onClick={() => {
                remove(screenIndex);
              }}
            >
              remove screen
            </Button>
          </div>

          <div className={`flex flex-col gap-2`}>
            <div className="grid grid-cols-2 gap-2">
              <Label
                title="Projection type"
                error={errors.screens?.[screenIndex]?.type?.toString()}
              >
                <HtmlSelect
                  placeholder="projection type"
                  {...register(`screens.${screenIndex}.projectionType`)}
                >
                  {Object.values(ProjectionType).map((type: any) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </HtmlSelect>
              </Label>
              <Label
                title="Sound system type"
                error={errors.screens?.[screenIndex]?.type?.toString()}
              >
                <HtmlSelect
                  placeholder="sound system type"
                  {...register(`screens.${screenIndex}.soundSystemType`)}
                >
                  {Object.values(SoundSystemType).map((type: any) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </HtmlSelect>
              </Label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Label
                title="Rows"
                error={errors.screens?.[screenIndex]?.rows?.message}
              >
                <Input
                  placeholder="Enter the number of rows"
                  {...register(`screens.${screenIndex}.rows`, {
                    valueAsNumber: true,
                  })}
                  className="text-black dark:text-black"
                />
              </Label>
              <Label
                title="Columns"
                error={errors.screens?.[screenIndex]?.columns?.message}
              >
                <Input
                  type="number"
                  placeholder="Enter the number of columns"
                  {...register(`screens.${screenIndex}.columns`, {
                    valueAsNumber: true,
                  })}
                  className="text-black dark:text-black"
                />
              </Label>
              <Label
                title="Price"
                error={errors.screens?.[screenIndex]?.price?.message}
              >
                <Input
                  type="number"
                  placeholder="Enter the price"
                  {...register(`screens.${screenIndex}.price`, {
                    valueAsNumber: true,
                  })}
                  className="text-black dark:text-black"
                />
              </Label>
            </div>
            <Grid
              rows={screens?.[screenIndex]?.rows || 0}
              columns={screens?.[screenIndex]?.columns || 0}
            />
          </div>
        </SimpleAccordion>
      ))}
      <div>
        <Button
          className="flex items-center justify-center w-full py-2 text-xs border border-dashed"
          size="lg"
          variant="link"
          onClick={() =>
            append({
              columns: 0,
              rows: 0,
              price: 0,
              projectionType: ProjectionType.Atoms,
              soundSystemType: SoundSystemType.Dolby,
            })
          }
        >
          <Plus className="w-4 h-4" /> Add screen
        </Button>
      </div>
    </div>
  );
};

const ShowLocation = () => {
  const { address } = useWatch<FormTypeCreateCinema>();

  return (
    <div>
      <span className="px-2 py-1 text-xs rounded bg-gray-50">
        {address?.lat?.toFixed(4)}
      </span>{" "}
      <span className="px-2 py-1 text-xs rounded bg-gray-50">
        {address?.lng?.toFixed(4)}
      </span>
    </div>
  );
};

export const StaightMovieScreen = () => {
  return (
    <div className="mb-4">
      <div className="h-0.5 bg-gray rounded"></div>
      <div className="flex ">
        <div className="flex-1 h-4 bg-gradient-to-tr from-transparent via-transparent to-gray" />
        <div className="flex-1 h-4 bg-gradient-to-tl from-transparent via-transparent to-gray" />
      </div>
      <div className="text-xs text-center text-gray-500 dark:text-white">
        Eyes this way
      </div>
    </div>
  );
};

export const CurvedScreen = ({ width = 300, height = 10 }) => {
  const curveOffset = height * 0.9;

  return (
    <svg
      width={"100%"}
      className="mt-6"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path
        d={`M 0,${height} L 0,0 Q ${
          width / 2
        },${curveOffset} ${width},0 L ${width},${height} Z`}
        fill="black"
      />
    </svg>
  );
};
export const Grid = ({ rows, columns }: { rows: any; columns: any }) => {
  const renderRows = () => {
    const rowElements: JSX.Element[] = [];

    for (let i = 0; i < rows; i++) {
      const columnElements: JSX.Element[] = [];
      for (let j = 0; j < columns; j++) {
        columnElements.push(<Square key={`${i}-${j}`} />);
      }
      rowElements.push(
        <div key={`row-${i}`} className="flex gap-1">
          {columnElements}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-2 px-2 overflow-x-auto">
        {rowElements}
      </div>
    );
  };

  return (
    <div className="w-full ">
      {renderRows()}

      <CurvedScreen />
    </div>
  );
};

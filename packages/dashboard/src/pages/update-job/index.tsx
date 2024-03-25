import { ReactNode, useMemo, useState } from "react";
import { SideBar } from "../../components/shared/form-side-menu";
import PageTitle from "../../components/shared/page-title";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { errorInterceptorV2 } from "../../lib/error";
import jobService from "../../services/job";

import { AppError } from "../../types/app-error";
import { JobCreateInput, Job, JobUpdateInput, Model, BookingCreateInput } from "@jimmodel/shared";
import JobDetailsForm from "../../components/job/job-details-form";
import LoaderBlock from "../../components/shared/loader-block";
import ErrorBlock from "../../components/shared/error-block";
import JobModelForm from "../../components/job/job-model-form";
import modelService from "../../services/model";
import JobBookingForm from "../../components/job/job-booking-form";
import useNotification from "../../hooks/use-notification";

const menuItems: {
  label: string;
  value: string;
  form?: ({
    handleUpdateJob,
  }: {
    handleUpdateJob: (input: JobCreateInput) => void;
    handleAddModel: (model: Model) => void;
    handleRemoveModel: (modelId: string) => void;
    handleSearchModel: (term: string) => void;
    handleAddBooking: (bookingInput: BookingCreateInput) => void;
    handleRemoveBooking: (bookingId: string) => void;
    searchedModels?: Model[];
    initialData: Job;
  }) => ReactNode;
}[] = [
  {
    label: "Job Details",
    value: "job-details",
    form: ({ handleUpdateJob, initialData }) => (
      <JobDetailsForm initialData={initialData} onSubmit={handleUpdateJob} />
    ),
  },
  {
    label: "Models",
    value: "model",
    form: ({ handleSearchModel, searchedModels, handleAddModel, initialData, handleRemoveModel }) => (
      <JobModelForm
      onRemoveModel={handleRemoveModel}
        onAddModel={handleAddModel}
        searchedModels={searchedModels}
        onSeachTermChange={handleSearchModel}
        models={initialData.models}
      />
    ),
  },
  {
    label: "Booking",
    value: "booking",
    form: ({handleAddBooking, initialData ,handleRemoveBooking}) => <JobBookingForm onRemoveBooking={handleRemoveBooking} bookings={initialData.bookings} onAddBooking={handleAddBooking} />
  },
];

function UpdateJobPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParam, setSearchParam] = useSearchParams()
  const initialFormIndex = menuItems.findIndex(({value}) => value === searchParam.get("form") )
  const [formIndex, setFormIndex] = useState(initialFormIndex === -1 ? 0 : initialFormIndex);
  const [modelSearchTerm, setModelSeachTerm] = useState("");
  const queryClient = useQueryClient();
  const {success} = useNotification()

  // Get job
  const {
    data: job,
    isPending: isLoadingJob,
    error: getJobError,
  } = useQuery<unknown, AppError, Job>({
    queryKey: ["jobs", id],
    queryFn: id
      ? ({ signal }) => errorInterceptorV2(jobService.getById, { id, signal })
      : undefined,
  });



  // Update job details
  const {
    mutate: updateJob,
    // isPending: isUpdatingJob,
    // error: updateJobError,
  } = useMutation({
    mutationFn: id
      ? (input: JobUpdateInput) =>
          errorInterceptorV2(jobService.updateById, { id, input })
      : undefined,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", id] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // Search models
  const { data: searchedModels } = useQuery({
    queryKey: ["models", { q: modelSearchTerm }],
    queryFn: () =>
      errorInterceptorV2(modelService.getAll, { q: modelSearchTerm }),
    enabled: modelSearchTerm !== "",
  });

  // Add model
  const { mutate: addModel } = useMutation({
    mutationFn: id
      ? (modelId: string) =>
          errorInterceptorV2(jobService.addModel, { id, modelId })
      : undefined,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", id] });
      success("Model added to job")
    },
  });

  const {mutate: removeModel} = useMutation({
    mutationFn: id ? (modelId: string) => jobService.removeModel({ id, modelId }) : undefined,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", id] });
      success("Model removed from job")
    }
  })


  const {mutate: addBooking} = useMutation({
    mutationFn: id ? (bookingInput: BookingCreateInput) => jobService.addBooking({id, bookingInput}) : undefined,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", id] });
     success("Booking added to job")
    }
  })

  const {mutate: removeBooking} = useMutation({
    mutationFn: id ? (bookingId: string) => jobService.removeBooking({bookingId}) : undefined,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs", id] });
     success("Booking removed from job")
    }
  })

  const unaddedModels = useMemo(() => {
    if (searchedModels?.data && job?.models) {
      return searchedModels.data.filter(
        (model) => !job.models.find((m) => m.id === model.id)
      );
    }
    return [];
  }, [searchedModels, job?.models]);

  const currentForm = menuItems[formIndex].form;

  function renderForm() {
    if (isLoadingJob || currentForm === undefined) {
      return <LoaderBlock message="Loading job data..." />;
    } else if (getJobError) {
      return <ErrorBlock error={getJobError} />;
    } else {
      return currentForm({
        handleUpdateJob: updateJob,
        handleAddModel: (model) => addModel(model.id),
        handleRemoveModel: removeModel,
        initialData: job,
        handleSearchModel: (term) => setModelSeachTerm(term),
        searchedModels: unaddedModels,
        handleAddBooking: addBooking,
        handleRemoveBooking: removeBooking
        
      });
    }
  }

  return (
    <>
      <PageTitle
        title="Update Job Details"
        subtitle="Job date the recrod in the database"
      />
      <div className="flex gap-8">
        <div className="">
          <SideBar
            menuItems={menuItems}
            selected={menuItems[formIndex].value}
            onChange={({ index }) => {
              setFormIndex(index);
              setSearchParam(prev => ({...prev, form: menuItems[index].value,}), {replace: true})
            }}
          />
        </div>
        <div className="grow">{renderForm()}</div>
      </div>
    </>
  );
}

export default UpdateJobPage;

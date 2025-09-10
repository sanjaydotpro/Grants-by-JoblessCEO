import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { TbCaretDownFilled, TbCaretUpFilled, TbNews } from "react-icons/tb";
import { useGetNotificationsQuery } from "@/app/services/notifications/getAllNotifications";

function NewsTips() {
  const {
    data: allNotifications,
    error,
    isLoading,
  } = useGetNotificationsQuery();

  if (isLoading) {
    return (
      <div className="w-full rounded-lg">
        <Skeleton className="h-[50px] w-full" />
      </div>
    );
  }
  if (error) {
    return <div>Error!</div>;
  }

  return (
    <Alert variant="info" className="relative py-3 flex mb-4 md:mb-0">
      <TbNews className="h-4 w-4" />
      <AlertDescription className="mt-1 font-medium">
        {allNotifications &&
          allNotifications.map((notification, index) => (
            <div key={index}>{notification.value}</div>
          ))}
      </AlertDescription>
      <div
        className="absolute top-0 right-0 mt-1 mr-4 flex 
                  flex-col"
      >
        <button
          aria-label="Move Up"
          className="hover:shadow-lg hover:bg-opacity-50"
        >
          <TbCaretUpFilled className="h-5 w-5" />
        </button>
        <button
          aria-label="Move Down"
          className="hover:shadow-lg hover:bg-opacity-50"
        >
          <TbCaretDownFilled className="h-5 w-5" />
        </button>
      </div>
    </Alert>
  );
}

export default NewsTips;

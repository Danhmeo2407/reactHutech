export const userColumns = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "displayName", headerName: "Name", width: 150 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image} alt="avatar" />{" "}
          {params.row.username}{" "}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
  },

  {
    field: "studentId",
    headerName: "ID Student",
    width: 150,
  },
  {
    field: "class",
    headerName: "Class",
    width: 150,
  },
  {
    field: "faculty",
    headerName: "Faculty",
    width: 150,
  },
];

export const eventColumns = [
  { field: "id", headerName: "ID", width: 170 },
  {
    field: "poster",
    headerName: "Poster",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.poster
                ? params.row.poster
                : "https://firebasestorage.googleapis.com/v0/b/react-64fdf.appspot.com/o/events%2F1704474045866logo_hutech.png?alt=media&token=4b893ebc-df15-4103-9200-8f2c5a847a86"
            }
            alt="poster"
          />
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 400,
  },

  {
    field: "beginTime",
    headerName: "BeginTime",
    width: 200,
  },
  {
    field: "location",
    headerName: "Location",
    width: 200,
  },
  {
    field: "faculty",
    headerName: "Faculty",
    width: 150,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 100,
  },
];

export const newsColumns = [
  { field: "id", headerName: "ID", width: 170 },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.image
                ? params.row.image
                : "https://firebasestorage.googleapis.com/v0/b/react-64fdf.appspot.com/o/events%2F1704474045866logo_hutech.png?alt=media&token=4b893ebc-df15-4103-9200-8f2c5a847a86"
            }
            alt="poster"
          />
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 400,
  },
  {
    field: "time",
    headerName: "Time",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 100,
  },
];

export const reportsColumns = [
  { field: "userUid", headerName: "UserUid", width: 170 },
  {
    field: "fullName",
    headerName: "FullName",
    width: 400,
  },
  {
    field: "mssv",
    headerName: "Mssv",
    width: 200,
  },
  {
    field: "reportContent",
    headerName: "ReportContent",
    width: 100,
  },
  {
    field: "feedback",
    headerName: "Feedback",
    width: 100,
  },
];

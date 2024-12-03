export type FeedbackData = {
  _id: string;
  title: string;
  description: string;
  date: string;
  attachment: string;
  complaint: string;
  created_at: string;
  updated_at: string;
};

export type ApiResponse = {
  code: number;
  status: string;
  message: string;
  data: FeedbackData;
};

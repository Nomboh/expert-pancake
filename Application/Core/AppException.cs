namespace Application.Core
{
    public class AppException
    {
        public AppException(int statusCode, string message, string details = null) 
        {
            this.StatusCode = statusCode;
            this.Details = details;
            this.Message = message;
   
        }
         public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}
using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private Cloudinary _cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> option)
        {
            var account = new Account(
                option.Value.CloudName,
                option.Value.ApiKey,
                option.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }
        async Task<PhotoUploadResult> IPhotoAccessor.AddPhoto(IFormFile file)
        {
            if(file.Length > 0){
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Gravity(Gravity.BodyFace).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if(uploadResult.Error != null){
                    throw new Exception(uploadResult.Error.Message);
                }

                return new PhotoUploadResult{
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString()
                };
            }

            return null;
        }

        async Task<string> IPhotoAccessor.DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
}
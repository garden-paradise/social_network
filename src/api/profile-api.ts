import { PhotosType, ProfileType } from '../redux/profiles-reducer';
import { instance, ResponseType } from './api';

type SavePhotoResType = {
  photos: PhotosType;
};

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instance.get<string>(`/profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put<ResponseType>(`/profile/status`, { status });
  },
  savePhoto(photoFile: any) {
    let formData = new FormData();
    formData.append('image', photoFile);
    return instance.put<ResponseType<SavePhotoResType>>(
      `/profile/photo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },
  saveProfileInfo(profileInfo: ProfileType) {
    return instance.put<ResponseType>(`/profile`, profileInfo);
  },
};

import { useEffect, useState } from 'react';
import ImageViewer from './ImageViewer';
import CommentsViewer from './CommentsViewer';
import Post from './Post';

export default function PostCard({ post }) {
  const [isLike, setIsLike] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [isCommentsViewerOpen, setIsCommentsViewerOpen] = useState(false);

  useEffect(() => {
    if (isImageViewerOpen || isCommentsViewerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Ensure scroll is re-enabled on component unmount
    };
  }, [isImageViewerOpen, isCommentsViewerOpen]);


  return (
    <>
      <Post post={post} isLike={isLike} setIsLike={setIsLike} isSave={isSave} setIsSave={setIsSave} isReadMore={isReadMore} setIsReadMore={setIsReadMore} setIsImageViewerOpen={setIsImageViewerOpen} setIsCommentsViewerOpen={setIsCommentsViewerOpen} isShareModalOpen={isShareModalOpen} setIsShareModalOpen={setIsShareModalOpen} />


      <ImageViewer post={post} isImageViewerOpen={isImageViewerOpen} setIsImageViewerOpen={setIsImageViewerOpen} />

      <CommentsViewer post={post} isLike={isLike} setIsLike={setIsLike} isSave={isSave} setIsSave={setIsSave} isReadMore={isReadMore} setIsReadMore={setIsReadMore} setIsImageViewerOpen={setIsImageViewerOpen} setIsCommentsViewerOpen={setIsCommentsViewerOpen} isCommentsViewerOpen={isCommentsViewerOpen} isShareModalOpen={isShareModalOpen} setIsShareModalOpen={setIsShareModalOpen} />
    </>
  );
}
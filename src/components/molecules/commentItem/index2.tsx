// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Dompurify from 'dompurify';

// import * as T from '^/types';
// import { RootState } from '^/store';
// import { deleteCommentAction } from '^/store/slices/comment';
// import {
//   EditWrapper,
//   EditIcon,
//   DeleteIcon,
//   CommentWrapper,
//   MentionWrapper,
//   AuthorInfo,
//   AuthorName,
//   ProfilePhoto,
//   Description,
//   ReactMoment,
// } from './styles';

// interface Props {
//   comment: T.Comment
// }

// function CommentItem({
//   comment,
// }: Props): JSX.Element {
//   const { userAuth } = useSelector((state: RootState) => state.auth);

//   const loginUser = userAuth?._id;
//   // dispatch
//   const dispatch = useDispatch();

//   return (
//     <CommentWrapper key={comment?._id}>
//       {/* Check if is the same user created this comment */}
//       {loginUser === comment?.user?._id ? (
//         <EditWrapper>
//           <Link to={`/update-comment/${comment?._id}`}>
//             <EditIcon />
//           </Link>
//           <DeleteIcon onClick={() => dispatch(deleteCommentAction(comment?._id))} />
//         </EditWrapper>
//       ) : null}
//       <MentionWrapper>
//         <AuthorInfo>
//           <ProfilePhoto src={comment?.user?.profilePhoto} alt={comment?.user.name} />
//           <Link to={`/profile/${comment?.user?._id}`}>
//             <AuthorName>
//               {comment?.user?.name}
//             </AuthorName>
//           </Link>
//         </AuthorInfo>
//         <Description dangerouslySetInnerHTML={{
//           __html: Dompurify.sanitize(comment?.description),
//         }}
//         />
//         <ReactMoment fromNow ago>
//           {comment?.createdAt}
//         </ReactMoment>
//       </MentionWrapper>
//     </CommentWrapper>
//   );
// }

// export default CommentItem;
export default {};

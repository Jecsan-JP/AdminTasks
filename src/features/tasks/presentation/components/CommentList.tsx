import React, { useState } from 'react';
// import { Comment } from '../hooks/useTasks';
import { Comment } from '../../domain/models/Comment';
import Modal from '@/common/presentation/components/Modal';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const handleAddComment = () => {
    // Lógica para agregar comentario
    setIsCommentModalOpen(false);
  };

  const handleEditComment = (comment: Comment) => {
    setSelectedComment(comment);
    setIsEditModalOpen(true);
  };

  if (!comments || comments.length === 0) return null;
  return (
    <div>
      <div className="mt-4 flex gap-2">
        <button
          className="rounded bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 hover:bg-green-200"
          onClick={() => setIsCommentModalOpen(true)}
        >
          + Comentario
        </button>
      </div>
      <h4 className="mb-1 text-xs font-semibold text-gray-700">Comentarios:</h4>
      <ul className="space-y-1">
        {comments.map((comment) => (
          <li
            key={comment._id}
            className="flex items-center justify-between rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
          >
            <span>{comment.content}</span>
            <button
              className="ml-2 text-blue-600 hover:text-blue-800"
              onClick={() => handleEditComment(comment)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        title="Nuevo comentario"
      >
        {/* <CommentForm onSubmit={handleAddComment} /> */}
        <>Formulario agregar comentario</>
      </Modal>
      {/* Modal para editar comentario */}
      {selectedComment && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Editar comentario"
        >
          <>Formulario editar comentario</>
        </Modal>
      )}
    </div>
  );
};

export default CommentList;

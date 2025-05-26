import React, { useState } from 'react';
import { Comment } from '../../domain/models/Comment';
import Modal from '@/common/presentation/components/Modal';
import CommentForm from './CommentForm';
import { useCommentUpdate } from '../hooks/useCommentUpdate';
import { useCommentDelete } from '../hooks/useCommentDelete';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const { handleUpdateComment, loading, error, success } = useCommentUpdate();
  const { handleDeleteComment } = useCommentDelete();

  const handleEditCommentSubmit = async ({ content }: { content: string }) => {
    if (selectedComment) {
      await handleUpdateComment(selectedComment._id, content);
      setIsEditModalOpen(false);
    }
  };

  if (!comments || comments.length === 0) return null;
  return (
    <div>
      <h4 className="mb-1 text-xs font-semibold text-gray-700">Comentarios:</h4>
      <ul className="space-y-1">
        {comments.map((comment) => (
          <li
            key={comment._id}
            className="flex items-center justify-between rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
          >
            <span>{comment.content}</span>
            <div className="flex gap-2">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => {
                  setSelectedComment(comment);
                  setIsEditModalOpen(true);
                }}
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
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDeleteComment(comment._id)}
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal para editar comentario */}
      {selectedComment && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Editar comentario"
        >
          <CommentForm
            onSubmit={handleEditCommentSubmit}
            initialValues={{ content: selectedComment.content }}
            loading={loading}
            error={error}
            success={success}
          />
        </Modal>
      )}
    </div>
  );
};

export default CommentList;

import React from 'react';
import './style.scss';

export interface Props {
  followerCount?: number;
  followCount?: number;
  birthDate?: string | null;
  location?: string | null;
}

function formatDate(date: number | Date) {
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
  }).format(date);
}

const FollowStatus: React.FC<Props> = ({
  followerCount = 0,
  followCount = 0,
  birthDate,
  location,
}: Props): JSX.Element => {
  return (
    <>
      <div>
        <span className="value">{followCount}</span> <label>following</label>
      </div>
      <div>
        {location && (
          <>
            <label>&#9678;</label> {location}
          </>
        )}
      </div>
      <div>
        <span className="value">{followerCount}</span> <label>followers</label>
      </div>
      {birthDate && (
        <div>
          <label>&#9678;</label>
          {formatDate(new Date(birthDate))}
        </div>
      )}
    </>
  );
};

export default React.memo(FollowStatus);

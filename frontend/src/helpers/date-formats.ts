import dayjs from 'dayjs';

export const formatDateTime = (date: string): string => {
  const now = dayjs();
  const messageData = dayjs(date);

  if (now.diff(messageData, 'minute') < 1) {
    return 'just now';
  } else if (now.diff(messageData, 'hour')) {
    return messageData.format('hh:mm A');
  } else if (now.diff(messageData, 'day') < 1) {
    return messageData.format('hh:mm A');
  } else if (now.diff(messageData, 'year') < 1) {
    return messageData.format('MMM DD hh:mm A');
  } else {
    return messageData.format('DDD MM YYYY hh:mm A');
  }
}

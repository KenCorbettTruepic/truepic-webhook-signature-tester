/* Services */
export default function verifyTimestamp({ timestamp, leewayMinutes = 5 }) {
  const diff = Math.abs(Date.now() - timestamp * 1000);
  const diffMinutes = Math.ceil(diff / (1000 * 60));

  return leewayMinutes >= diffMinutes;
}

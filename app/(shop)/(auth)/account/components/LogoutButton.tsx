export default function LogoutButton() {
  return (
    <form action="../auth/sign-out" method="post">
      <button className="hover:italic text-sm mt-3">
        Sign out
      </button>
    </form>
  )
}

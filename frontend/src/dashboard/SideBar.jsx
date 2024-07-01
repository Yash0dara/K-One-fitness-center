import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineBookOpen, HiOutlineBriefcase, HiOutlineCash, HiOutlineChat, HiOutlineCloud, HiOutlineFire, HiOutlinePencil, HiShoppingBag, HiSupport, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
  const navigate = useNavigate()


  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

  return (
    <Sidebar aria-label="Sidebar with content separator example">

      <Sidebar.Logo src="./img/logo.png" imgAlt="K-ONE logo">
        K-One fitness
      </Sidebar.Logo>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
          Dashboard
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiInbox}>
          Inbox
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiUser}>
          Users
        </Sidebar.Item>
        <Sidebar.Collapse icon={HiShoppingBag} label="Products Management">
            <Sidebar.Item icon={HiOutlineCloud} href="/admin/dashboard/upload"> Upload Products</Sidebar.Item>
            <Sidebar.Item icon={HiOutlineBriefcase} href="/admin/dashboard/manage"> Product Management</Sidebar.Item>

          </Sidebar.Collapse>
          <Sidebar.Collapse icon={HiOutlineFire} label="Workout Management">
            <Sidebar.Item  href="/admin/dashboard/ExerciseList"> Exercises</Sidebar.Item>
            <Sidebar.Item  href="/admin/dashboard/WorkoutList"> Workout</Sidebar.Item>
            

          </Sidebar.Collapse>
          <Sidebar.Collapse icon={HiOutlineBookOpen} label="Booking Management">
            <Sidebar.Item  href="/admin/dashboard/BookingRequest">Boooking Requests</Sidebar.Item>
            <Sidebar.Item  href="/admin/dashboard/ManagerScheduleView">Booking Management</Sidebar.Item>
         </Sidebar.Collapse>
            <Sidebar.Collapse icon={HiOutlineCash} label="Payment Management">
            <Sidebar.Item  href="/admin/dashboard/received">Slips</Sidebar.Item>
            <Sidebar.Item  href="/admin/dashboard/salary_cal">Salary</Sidebar.Item>
          </Sidebar.Collapse>

          <Sidebar.Collapse icon={HiOutlineChat} label="Reviews Management">
            <Sidebar.Item  href="/admin/dashboard/a_ContactUs">Reviews</Sidebar.Item>
            <Sidebar.Item  href="/admin/dashboard/a_ReviewBoxes">Review Categories
                <Sidebar.Collapse icon={HiOutlineChat} label="">
                  <Sidebar.Item  href="/admin/dashboard/a_Instructor">Instructor Reviews</Sidebar.Item>
                  <Sidebar.Item  href="/admin/dashboard/a_product">Workout Reviews</Sidebar.Item>
                  <Sidebar.Item  href="/admin/dashboard/a_workout">Product Reviews</Sidebar.Item>
                </Sidebar.Collapse>          
            </Sidebar.Item>
          </Sidebar.Collapse>


      </Sidebar.ItemGroup>
      <Sidebar.ItemGroup>
        <Sidebar.Item href="#" icon={HiViewBoards}>
          Documentation
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiSupport}>
          Help
        </Sidebar.Item>        <Sidebar.Item href="#" icon={HiArrowSmRight}>
          Log In
        </Sidebar.Item>
        <Sidebar.Item href="#" icon={HiTable} onClick={userLogout} to="/">
          Log Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}

export default SideBar
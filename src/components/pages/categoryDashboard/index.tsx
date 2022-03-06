import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { RootState } from '^/store';
import { deleteCategoriesAction, fetchCategoriesAction } from '^/store/slices/category';
import dateFormatter from '^/utils/dateFormatter';
import SingleColumnLayout from '^/components/templates/singleColumnLayout';
import {
  Dashboard,
  DashboardHeader,
  DashboardBody,
  Row,
  UserInfo,
  ProfileImage,
} from './styles';

function CategoryDashboardPage(): JSX.Element {
  const dispatch = useDispatch();

  const category = useSelector((state: RootState) => state.category);
  const {
    loading, error, categoryList, isDeleted,
  } = category;

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch, isDeleted]);

  const { userAuth } = useSelector((state: RootState) => state.auth);

  if (!userAuth) {
    return <Redirect to="/" />;
  }

  return (
    <SingleColumnLayout>
      <Dashboard>
        <DashboardHeader>
          <div>
            프로필
          </div>
          <div>
            카테고리 이름
          </div>
          <div>
            생성일자
          </div>
          <div>
            편집
          </div>
          <div>
            삭제
          </div>
        </DashboardHeader>
        <DashboardBody>
          {categoryList && categoryList.map((categoryItem) => (
            <Row key={categoryItem._id}>
              <UserInfo>
                <ProfileImage src={categoryItem.user?.profilePhoto} alt={categoryItem.title} />
                <div>
                  {categoryItem.user?.name}
                  {categoryItem.user?.email}
                </div>
              </UserInfo>
              <div>{categoryItem.title}</div>
              <div>{dateFormatter(categoryItem.createdAt)}</div>
              <div>
                <Link to={`/update-category/${categoryItem._id}`}>
                  편집
                </Link>
              </div>
              <div>
                <button type="button" onClick={() => dispatch(deleteCategoriesAction(categoryItem._id))}>
                  삭제
                </button>
              </div>
            </Row>
          ))}
        </DashboardBody>
      </Dashboard>
    </SingleColumnLayout>
  );
}

export default CategoryDashboardPage;

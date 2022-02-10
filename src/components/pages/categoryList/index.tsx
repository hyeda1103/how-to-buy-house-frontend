import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store';
import { fetchCategoriesAction } from '../../../store/slices/categories';
import SingleColumnLayout from '../../templates/singleColumnLayout';
import dateFormatter from '../../../utils/dateFormatter';
import {
  Dashboard,
  DashboardHeader,
  DashboardBody,
  Row,
  UserInfo,
  ProfileImage,
} from './styles';

function CategoryListPage(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const category = useSelector((state: RootState) => state.category);
  const { loading, error, categoryList } = category;

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
                <button type="button">
                  편집
                </button>
              </div>
            </Row>
          ))}
        </DashboardBody>
      </Dashboard>
    </SingleColumnLayout>
  );
}

export default CategoryListPage;
